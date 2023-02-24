import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';

import './style.css';
import { Heatmap, OrderedList } from './../../../Components';

const serverScheme = 'ws';
const serverHost = '127.0.0.1';
const serverPort = 3001;
const serverUrl = `${serverScheme}://${serverHost}:${serverPort}`
const socket = io(serverUrl);

const retention = 30;

function LiveView(props: any) {
  const { deviceID } = useParams();
  const [currentData, updateData] = useState<VisDatum[]>([]);
  const [newData, updateNewData] = useState<VisDatum[]>([]);
  const [socketConnected, setConnected] = useState(socket.connected);
  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      setConnected(true);
      socket.emit('client hello', deviceID);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    socket.on('update:' + deviceID, (message) => {
      const ts = new Date();
      const updates = JSON.parse(message).map((x: string, i: number) => ({ tag: i.toString(16), timestamp: ts, value: parseFloat(x) } as VisDatum));
      updateNewData(updates);
      updateData((prevData: VisDatum[]): VisDatum[] => {
        return [...prevData.slice((1 - retention) * updates.length), ...updates];
      });
    });
    return () => {
      if (socketConnected) {
        socket.emit('client goodbye', deviceID);
        socket.disconnect();
      }
      socket.off('connect');
      socket.off('disconnect');
      socket.off('update:' + deviceID);
    };
  }, [deviceID, socketConnected]);
  return (
    <div className="list-view-container">
      <span className="hidden">App LiveView</span>
      <div className="heatmap-container">
        <Heatmap currentData={currentData} retention={retention} socketConnected={socketConnected} />
      </div>
      <div className="ordered-list-container">
        <OrderedList list={newData}/>
      </div>
    </div>
  );
}

export default LiveView;
