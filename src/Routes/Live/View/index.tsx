import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as mqtt from 'mqtt/dist/mqtt';
import { toast } from 'react-toastify';

import './style.css';
import { Heatmap, OrderedList } from './../../../Components';

import { mqttApi } from './../../../API';

function LiveView() {
  const { deviceId } = useParams();
  const [ currentData, updateData ] = useState<VisDatum[]>([]);
  const [ newData, updateNewData ] = useState<VisDatum[]>([]);
  const [ sampleRate, setSampleRate ] = useState(0);
  const [ client, setClient ] = useState<mqtt.MqttClient | null>(null);
  const [ connectStatus, setConnectStatus ] = useState('Disconnected');
  useEffect(() => {
    // console.log('effect connection');
    setConnectStatus('Connecting');
    const settings = mqttApi.getSettings();
    const mqttOption = {
      clean: true,
      connectTimeout: 4000,
      clientId: settings.mqttClientId,
      username: settings.mqttUsername,
      password: settings.mqttPassword
    };
    // console.log(`[mqtt] connecting with clientId=${mqttOption.clientId}`);
    setClient(mqtt.connect(settings.mqttUrl, mqttOption));
    return () => {
      // console.log('effect connection cleanup');
      // console.log(client);
      if (client === null) {
        // console.log('client not found');
      } else {
        // console.log('[mqtt] disconnect');
        client.end();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log('effect listeners');
    if (client === null) {
      // console.log('client not found');
    } else {
      client.on('connect', () => {
        toast.info(`Connected to server successfully`);
        setConnectStatus('Connected');
      });
      client.on('error', (err: Error) => {
        console.error('Connection error: ', err);
        toast.error(`Connection error: ${err}`);
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
        toast.info(`Reconnecting`);
      });
      client.on('message', (topic: string, payload: object) => {
        if(topic !== `tele/indoor_sound_classification/${deviceId}/state`) {
          return;
        }
        const message = JSON.parse(payload.toString());
        const timestamp: Date = message.timestamp;
        setSampleRate(message.sampleRate);
        const sampleRate = message.sampleRate;
        const updates = Object.keys(message.prediction).map((tag: string) => ({ tag: tag, timestamp: timestamp, value: message.prediction[tag] } as VisDatum));
        updateNewData(updates);
        updateData((prevData: VisDatum[]): VisDatum[] => {
          return [...prevData.filter(d => d.timestamp > new Date((new Date(Date.now()).getTime() - sampleRate * 60))), ...updates];
        });
      });
    }
  }, [client, deviceId]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log('effect subscription');
    const topic = `tele/indoor_sound_classification/${deviceId}/state`;
    if (client === null) {
      // console.log('client not found');
    } else {
      client.subscribe(topic, { qos: 0 }, (error) => {
        if (error) {
          // console.log('Subscribe to topics error', error);
          return;
        }
        // console.log(`[mqtt] subscribed topic=${topic}`);
      });
    }
    return () => {
      // console.log('effect subscription cleanup');
      if (client === null) {
        // console.log('client not found');
      } else {
        client.unsubscribe(topic, (error: Error) => {
          if (error) {
            // console.log('Unsubscribe error', error);
            return;
          }
          // console.log(`[mqtt] unsubsribed topic=${topic}`);
        });
      }
      updateData([]);
      updateNewData([]);
    }
  }, [deviceId, connectStatus]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="row">
      <span className="hidden">App LiveView</span>
      <h2>{ deviceId }</h2>
      <hr/>
      <div className="col col-md-7 col-sm-12 heatmap-container">
        <Heatmap key={ deviceId } currentData={ currentData } newData={ newData } connectStatus={ connectStatus } sampleRate={ sampleRate } />
      </div>
      <div className="col col-md-5 col-sm-12">
        <OrderedList list={ newData } />
      </div>
    </div>
  );
}

export default LiveView;
