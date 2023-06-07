import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backendApi } from './../../../API';
import './style.css';

function AlertList() {
  const [alertList, setAlertList] = useState<{ name: string, comment: string, lastFired: Date }[]>([]);
  useEffect(() => {
    backendApi.alerts.list().then(res => {
      setAlertList(res);
    });
  }, []);
  return (
    <div>
      <span className="hidden">App Alert List</span>
      <h2>Alert Management</h2>
      <hr />
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Alert Name</th>
            <th scope="col">Comment</th>
            <th scope="col">Last Fired</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          { alertList.map(alert => (
            <tr key={ alert.name }>
              <td>{ alert.name }</td>
              <td>{ alert.comment }</td>
              <td>{ alert.lastFired.toString() }</td>
              <td>
                <button type="button" className="btn btn-primary"><i className="bi bi-pencil"></i></button>&nbsp;
                <button type="button" className="btn btn-danger"><i className="bi bi-x-lg"></i></button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <button type="button" className="btn btn-success"><i className="bi bi-plus"></i> Add new alert</button>
    </div>
  );
}

export default AlertList;
