import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { backendApi } from './../../../API';

import './style.css';

function AlertList() {
  const [alertList, setAlertList] = useState<AlertObject[]>([]);
  useEffect(() => {
    backendApi.alerts.list().then(res => {
      setAlertList(res);
    });
  }, []);
  const removeAlert = (alertId: string) => {
    backendApi.alerts.delete(alertId);
    setAlertList(prevState => prevState.filter(alert => alert.name !== alertId));
    toast.success(`Alert ${alertId} deleted. `);
  };
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
              <td>{ alert.lastFired }</td>
              <td>
                <Link to={`/alert/${alert.name}`} type="button" className="btn btn-primary"><i className="bi bi-pencil"></i></Link>&nbsp;
                <button type="button" className="btn btn-danger" onClick={ () => removeAlert(alert.name) }><i className="bi bi-x-lg"></i></button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <Link to={`/alert/__new`} type="button" className="btn btn-success"><i className="bi bi-plus"></i> Add a new alert</Link>
    </div>
  );
}

export default AlertList;
