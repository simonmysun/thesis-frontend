import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as mqtt from 'mqtt/dist/mqtt';
import './style.css';

import { backendApi, connectionOptions } from './../../../API';

connectionOptions.url = `${connectionOptions.scheme}://${connectionOptions.host}:${connectionOptions.port}${connectionOptions.path}`;

function LiveList() {
  const [deviceList, setDeviceList] = useState<{ name: string, comment: string }[]>([]);
  const [deviceStatus, setDeviceStatus] = useState<{
    [name: string]: {
      status: string,
      prediction: string,
      lastUpdated: Date,
    }
  }>({});
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState('Disconnected');
  useEffect(() => {
    backendApi.devices.list().then(res => {
      setDeviceList(res);
      setDeviceStatus(res.reduce((acc: {
        [name: string]: {
          status: string,
          prediction: string,
          lastUpdated: Date,
        }
      }, device: { name: string, comment: string }) => {
        acc[device.name] = {
          status: 'bg-warning',
          prediction: '',
          lastUpdated: new Date(),
        };
        return acc;
      }, {}));
    });
  }, []);
  useEffect(() => {
    setConnectStatus('Connecting');
    const mqttOption = {
      clean: true,
      connectTimeout: 4000,
      clientId: connectionOptions.clientId(),
      username: connectionOptions.username,
      password: connectionOptions.password
    };
    setClient(mqtt.connect(connectionOptions.url, mqttOption));
    return () => {
      if (client === null) {
      } else {
        client.end();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (client === null) {
    } else {
      client.on('connect', () => {
        setConnectStatus('Connected');
      });
      client.on('error', (err: Error) => {
        client.end();
      });
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting');
      });
      client.on('message', (topic: string, payload: object) => {
        const match = topic.match(/tele\/indoor_sound_classification\/(?<deviceId>.+)\/state/);
        if (match !== null) {
          if (match.groups?.deviceId) {
            const deviceId = match.groups.deviceId;
            setDeviceStatus(prevDeviceStatus => {
              const message = JSON.parse(payload.toString());
              prevDeviceStatus[deviceId] = {
                status: 'bg-success',
                prediction: deviceId in prevDeviceStatus ? prevDeviceStatus[deviceId].prediction : '',
                lastUpdated: new Date(message.timestamp),
              }
              let max = 0;
              let maxId = 'Not detected';
              for (let p in message.prediction) {
                if (message.prediction[p] > max) {
                  if (message.prediction[p] > 0.5) {
                    max = message.prediction[p];
                    maxId = p;
                  }
                }
              }
              prevDeviceStatus[deviceId].prediction = maxId;
              return { ...prevDeviceStatus };
            });
          }
        }
      });
    }
  }, [client]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const topic = `tele/indoor_sound_classification/+/state`;
    if (client === null) {
    } else {
      client.subscribe(topic, { qos: 0 }, (error) => {
        if (error) {
          return;
        }
      });
    }
    return () => {
      if (client === null) {
      } else {
        client.unsubscribe(topic, (error: Error) => {
          if (error) {
            return;
          }
        });
      }
    }
  }, [connectStatus]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = setInterval(() => {
      setDeviceStatus(prevDeviceStatus => {
        for (let deviceId in prevDeviceStatus) {
          if (prevDeviceStatus[deviceId].lastUpdated) {
            const lastUpdated = prevDeviceStatus[deviceId].lastUpdated;
            if (new Date().getTime() - lastUpdated.getTime() > 5000) {
              prevDeviceStatus[deviceId].status = 'bg-danger';
              prevDeviceStatus[deviceId].prediction = 'Disconnected';
            }
          }
        }
        return { ...prevDeviceStatus };
      });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  });
  return (
    <div>
      <span className="hidden">App Live List</span>
      <h2>List of Device(s)</h2>
      <hr />
      <div className="list-group">
        {deviceList.map(device => (
          <Link to={`/live/${device.name}`} key={device.name} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${deviceStatus[device.name].status === 'bg-success' ? '' : 'disabled'}`} tabIndex={deviceStatus[device.name].status === 'bg-success' ? undefined : -1} aria-disabled={deviceStatus[device.name].status === 'bg-success' ? undefined : "true"}>
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                <span className={`position-absolute top-50 start-0 translate-middle p-2 border border-light rounded-circle ${deviceStatus[device.name].status}`}></span> {device.name}</div>
              {device.comment}
            </div>
            <span className="badge bg-light text-dark rounded-pill">{deviceStatus[device.name].prediction}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LiveList;
