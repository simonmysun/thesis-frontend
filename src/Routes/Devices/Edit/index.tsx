import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { backendApi } from './../../../API';

import './style.css';

function DeviceEdit() {
  const { deviceId } = useParams() as { deviceId: string };
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceObject | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  useEffect(() => {
    if (deviceId === '__new') {
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
    if (device?.name === '') {
      toast.warn('Device name cannot be empty! ');
      return;
    }
    setLocked(true);
    toast.promise(
      new Promise<string>((resolve, reject) => {
        if (deviceId === '__new') {
          backendApi.devices.add((device as DeviceObject).name, device as DeviceObject)
            .then(() => resolve('Success'))
            .then(() => setLocked(false))
            .then(() => navigate(`/device/${device?.name}`))
            .catch((e) => reject(e));
        } else {
          backendApi.devices.modify(deviceId, device as DeviceObject)
            .then(() => resolve('Success'))
            .then(() => setLocked(false))
            .catch((e) => reject(e));
        }
      }),
      {
        pending: {
          render() {
            return "Pending"
          },
          icon: '🔵',
        },
        success: {
          render({ data }) {
            return `${data}`;
          },
          icon: '🟢',
        },
        error: {
          render({ data }) {
            // When the promise reject, data will contains the error
            return `${data}`;
          },
          icon: '🔴',
        }
      }
    ).catch((e) => {
      console.log('fff', e);
      setLocked(false);
    });
  };
  return (
    <div>
      <span className="hidden">App Device Edit</span>
      <h2>{device === null ? '' : (deviceId === '__new' ? `Registering new device: ${device.name}` : `Editing: ${device.name}`)}</h2>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="device-name" placeholder="device name" value={device === null ? '' : device.name} disabled={deviceId !== '__new' || locked} onChange={updateDevice} />
        <label htmlFor="device-name" className="form-label">Name</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="device-comment" placeholder="device comment" value={device === null ? '' : device.comment} disabled={locked} onChange={updateDevice} />
        <label htmlFor="device-Comment" className="form-label">Comment</label>
      </div>
      <button type="button" className="btn btn-success mt-3" onClick={saveDevice} disabled={locked}><i className="bi bi-check-lg"></i> Save</button>
    </div>
  );
}

export default DeviceEdit;
