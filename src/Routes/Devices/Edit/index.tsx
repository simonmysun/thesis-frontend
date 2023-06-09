import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { backendApi } from './../../../API';

import './style.css';

function DeviceEdit() {
  const { deviceId } = useParams() as { deviceId: string };
  const [device, setDevice] = useState<DeviceObject | null>(null);
  useEffect(() => {
    if(deviceId === '__new') {
      setDevice({
        name: '',
        comment: '',
      });
    } else {
      backendApi.devices.query(deviceId).then(res => {
        setDevice(res);
      });
    }
  }, [deviceId]);
  const updateDevice = () => {
    setDevice({
      name: (document.querySelector('#device-name') as HTMLInputElement).value,
      comment: (document.querySelector('#device-comment') as HTMLInputElement).value,
    });
  };
  const saveDevice = () => {
    if(deviceId === '__new') {
      backendApi.devices.modify(deviceId, device as DeviceObject);
    } else {
      backendApi.devices.modify((device as DeviceObject).name, device as DeviceObject);
    }
  };
  return (
    <div>
      <span className="hidden">App Device Edit</span>
      <h2>{ device === null ? '' : (deviceId === '__new' ? `Registering new device: ${device.name}` : `Editing: ${device.name}`) }</h2>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="device-name" placeholder="device name" value={ device === null ? '' : device.name } disabled={deviceId !== '__new'} onChange={updateDevice} />
        <label htmlFor="device-name" className="form-label">Name</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="device-comment" placeholder="device name" value={ device === null ? '' : device.comment } onChange={updateDevice} />
        <label htmlFor="device-Comment" className="form-label">Comment</label>
      </div>
      <button type="button" className="btn btn-success mt-3" onClick={saveDevice}><i className="bi bi-check-lg"></i> Save</button>
    </div>
  );
}

export default DeviceEdit;
