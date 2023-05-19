import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendApi, connectionOptions } from './../../../API';

import './style.css';

function DeviceList() {
  const [deviceList, setDeviceList] = useState<{ name: string, comment: string }[]>([]);
  useEffect(() => {
    backendApi.devices.list().then(res => {
      setDeviceList(res);
    });
  }, []);
  return (
    <div>
      <span className="hidden">App Device List</span>
      <h2>Device Management</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Device Name</th>
            <th scope="col">Comment</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          { deviceList.map(device => (
            <tr key={ device.name }>
              <td>{ device.name }</td>
              <td>{ device.comment }</td>
              <td>
                <button type="button" className="btn btn-primary"><i className="bi bi-pencil"></i></button>&nbsp;
                <button type="button" className="btn btn-danger"><i className="bi bi-x-lg"></i></button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <button type="button" className="btn btn-success"><i className="bi bi-plus"></i> Add new device</button>
    </div>
  );
}

export default DeviceList;
