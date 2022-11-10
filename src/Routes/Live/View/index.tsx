import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useParams } from 'react-router-dom';

import './style.css';
import { Heatmap, Ridgeline } from './../../../Components';

const serverScheme = 'ws';
const serverHost = 'localhost';
const serverPort = 3001;
const serverUrl = `${serverScheme}://${serverHost}:${serverPort}`
const socket = io(serverUrl);

const retention = 30;

interface PlotObject {
  tag: number,
  timestamp: number,
  value: number
}

function LiveView(props: any) {
  const { deviceID } = useParams();
  const [ currentData, updateData ] = useState<PlotObject[]>([]);
  const [ socketConnected, setConnected ] = useState(socket.connected);
  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true);
      socket.emit('client hello', deviceID);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    socket.on('update:' + deviceID, (message) => {
      const ts = new Date().valueOf();
      const newData = JSON.parse(message).map((x: string, i: string) => ({ tag: i, timestamp: ts, value: x }));
      updateData((prevData: PlotObject[]): PlotObject[] => {
        if (prevData.length === 0) {
          return new Array(retention - 1).fill(0).map((tmp, t) => new Array(newData.length).fill(0).map((x, i) => ({ tag: i, timestamp: t, value: 0 } as PlotObject))).flat().concat(...newData)
        } else {
          return [...prevData.slice((1 - retention) * newData.length), ...newData];
        }
      });
    });
    return () => {
      if (socketConnected) {
        socket.emit('client goodbye', deviceID);
      }
      socket.off('connect');
      socket.off('disconnect');
      socket.off('update:' + deviceID);
    };
  }, [deviceID, socketConnected]);
  return (
    <div>
      App LiveView
      <div className="heatmap-container">
        <Heatmap source={ deviceID } currentData={ currentData } retention={ retention } socketConnected={ socketConnected } />
      </div>
      <div className="ridgeline-container">
        <Ridgeline source="{ deviceID }" />
      </div>
    </div>
  );
}

export default LiveView;
