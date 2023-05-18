import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as mqtt from 'mqtt/dist/mqtt';

import './style.css';
import { Heatmap, OrderedList } from './../../../Components';

const connectionOptions = {
  scheme: 'ws',
  host: 'mqtt-admin-mys-karlsruhe-0.makelove.expert',
  port: 80,
  path: '/mqtt',
  username: 'test',
  password: 'TuC',
  clientId: () => `frontend_${crypto.randomUUID()}`,
  url: ''
};

connectionOptions.url = `${connectionOptions.scheme}://${connectionOptions.host}:${connectionOptions.port}${connectionOptions.path}`;

function LiveView(props: any) {
  const { deviceID } = useParams();
  const [currentData, updateData] = useState<VisDatum[]>([]);
  const [newData, updateNewData] = useState<VisDatum[]>([]);
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState('Disconnected');
  useEffect(() => {
    console.log('effect connection');
    setConnectStatus('Connecting');
    const mqttOption = {
      clean: true,
      connectTimeout: 4000,
      clientId: connectionOptions.clientId(),
      username: connectionOptions.username,
      password: connectionOptions.password
    };
    console.log(`[mqtt] connecting with clientId=${mqttOption.clientId}`);
    setClient(mqtt.connect(connectionOptions.url, mqttOption));
    return () => {
      console.log('effect connection cleanup');
      console.log(client);
      if (client === null) {
        console.log('client not found');
      } else {
        console.log('[mqtt] disconnect');
        client.end();
      }
    };
  }, []);
  useEffect(() => {
    console.log('effect listeners');
    if (client === null) {
      console.log('client not found');
    } else {
      client.on('connect', () => {
        console.log(`[mqtt] connected`);
        setConnectStatus('Connected');
      });
      client.on('error', (err: Error) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('reconnect', () => {
        console.log(`[mqtt] reconnecting`);
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic: string, payload: object) => {
        const message = JSON.parse(payload.toString());
        const timestamp: Date = message.timestamp;
        const updates = Object.keys(message.prediction).map((tag: string) => ({ tag: tag, timestamp: timestamp, value: message.prediction[tag] } as VisDatum));
        updateNewData(updates);
        updateData((prevData: VisDatum[]): VisDatum[] => {
          return [...prevData.filter(d => d.timestamp > new Date((new Date(Date.now()).getTime() - 60000))), ...updates];
        });
      });
    }
  }, [client]);
  useEffect(() => {
    console.log('effect subscription');
    const topic = `tele/indoor_sound_classification/${deviceID}/state`;
    if (client) {
      client.subscribe(topic, { qos: 0 }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
        console.log(`[mqtt] subscribed topic=${topic}`);
      });
    } else {
      console.log('client not found');
    }
    return () => {
      console.log('effect subscription cleanup');
      client?.unsubscribe(topic, (error: Error) => {
        if (error) {
          console.log('Unsubscribe error', error);
          return;
        }
        console.log(`[mqtt] unsubsribed topic=${topic}`);
      });
      updateData([]);
      updateNewData([]);
    }
  }, [deviceID, connectStatus]);
  return (
    <div className="list-view-container">
      <span className="hidden">App LiveView</span>
      <div className="heatmap-container">
        <Heatmap key={deviceID} currentData={currentData} connectStatus={connectStatus} />
      </div>
      <div className="ordered-list-container">
        <OrderedList list={newData} />
      </div>
      <Link to="/live/fake_datasource">fake_datasource</Link>,
      <Link to="/live/fake_datasource2">fake_datasource2</Link>
    </div>
  );
}

export default LiveView;
