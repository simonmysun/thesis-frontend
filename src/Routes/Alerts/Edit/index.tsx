import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './style.css';

import { backendApi } from './../../../API';

function AlertEdit() {
  const { alertId } = useParams() as { alertId: string };
  const navigate = useNavigate();
  const [alert, setalert] = useState<AlertObject | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  useEffect(() => {
    if (alertId === '__new') {
      setalert({
        name: '',
        comment: '',
        lastFired: new Date(0).toISOString(),
        rule: {
          alertName: '',
          expression: '',
          for: '',
          labels: {
            severity: ''
          },
          annotations: {
            summary: '',
            description: ''
          }
        },
      });
    } else {
      backendApi.alerts.query(alertId).then(res => {
        setalert(res);
      });
    }
  }, [alertId]);
  const updateAlert = () => {
    setalert({
      name: (document.querySelector('#alert-name') as HTMLInputElement).value,
      comment: (document.querySelector('#alert-comment') as HTMLInputElement).value,
      lastFired: (document.querySelector('#alert-last-fired') as HTMLInputElement).value,
      rule: {
        alertName: (document.querySelector('#alert-name') as HTMLInputElement).value,
        expression: (document.querySelector('#alert-expression') as HTMLInputElement).value,
        for: (document.querySelector('#alert-for') as HTMLInputElement).value,
        labels: {
          severity: (document.querySelector('#alert-severity') as HTMLInputElement).value
        },
        annotations: {
          summary: (document.querySelector('#alert-annotations-summary') as HTMLInputElement).value,
          description: (document.querySelector('#alert-annotations-description') as HTMLInputElement).value
        }
      },
    });
  };
  const saveAlert = () => {
    if (alert?.name === '') {
      toast.warn('alert name cannot be empty! ');
      return;
    }
    setLocked(true);
    toast.promise(
      new Promise<string>((resolve, reject) => {
        if (alertId === '__new') {
          backendApi.alerts.add((alert as AlertObject).name, alert as AlertObject)
            .then(() => resolve('Success'))
            .then(() => setLocked(false))
            .then(() => navigate(`/alert/${alert?.name}`))
            .catch((e) => reject(e));
        } else {
          backendApi.alerts.modify(alertId, alert as AlertObject)
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
      <span className="hidden">App Alert Edit</span>
      <h2>{alert === null ? '' : (alertId === '__new' ? `Registering new alert: ${alert.name}` : `Editing: ${alert.name}`)}</h2>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-name" placeholder="alert name" value={alert === null ? '' : alert.name} disabled={alertId !== '__new' || locked} onChange={updateAlert} />
        <label htmlFor="alert-name" className="form-label">Name</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-comment" placeholder="alert comment" value={alert === null ? '' : alert.comment} disabled={locked} onChange={updateAlert} />
        <label htmlFor="alert-Comment" className="form-label">Comment</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-last-fired" placeholder="Last fired" value={alert === null ? '' : alert.lastFired} disabled={true} onChange={updateAlert} />
        <label htmlFor="alert-last-fired" className="form-label">Last fired</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-expression" placeholder="alert expression" value={alert === null ? '' : alert.rule.expression} disabled={locked} onChange={updateAlert} />
        <label htmlFor="alert-expression" className="form-label">Expression</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-for" placeholder="alert for" value={alert === null ? '' : alert.rule.for} disabled={locked} onChange={updateAlert} />
        <label htmlFor="alert-for" className="form-label">For</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-severity" placeholder="alert severity" value={alert === null ? '' : alert.rule.labels.severity} disabled={locked} onChange={updateAlert} />
        <label htmlFor="alert-severity" className="form-label">Severity</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-annotations-summary" placeholder="alert summary" value={alert === null ? '' : alert.rule.annotations.summary} disabled={locked} onChange={updateAlert} />
        <label htmlFor="alert-annotations-summary" className="form-label">Summary</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="alert-annotations-description" placeholder="alert annotations-description" value={alert === null ? '' : alert.rule.annotations.description} disabled={locked} onChange={updateAlert} />
        <label htmlFor="alert-annotations-description" className="form-label">Description</label>
      </div>
      <button type="button" className="btn btn-success mt-3" onClick={saveAlert} disabled={locked}><i className="bi bi-check-lg"></i> Save</button>
    </div>
  );
}
export default AlertEdit;
