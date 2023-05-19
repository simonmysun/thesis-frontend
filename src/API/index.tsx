import { v4 } from 'uuid';

const connectionOptions = {
  scheme: 'ws',
  host: 'thesis-frontend.makelove.expert',
  port: 80,
  path: '/mqtt',
  username: 'test',
  password: 'TuC',
  clientId: () => `frontend_${v4()}`,
  url: ''
};
connectionOptions.url = `${connectionOptions.scheme}://${connectionOptions.host}:${connectionOptions.port}${connectionOptions.path}`;

const backendApi = {
  devices: {
    list: () => fetch('/api/devices').then(res => res.json()),
    query: (id: string) => fetch(`/api/devices/${id}`).then(res => res.json()),
    modify: (id: string, payload: { name: string, comment: string }) => fetch(`/api/devices/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json()),
    add: (id: string, payload: { name: string, comment: string }) => fetch(`/api/devices/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`/api/devices/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()),
  },
  alerts: {
    list: () => fetch('/api/alerts').then(res => res.json()),
    query: (id: string) => fetch(`/api/alerts/${id}`).then(res => res.json()),
    modify: (id: string, payload: { name: string, comment: string }) => fetch(`/api/alerts/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json()),
    add: (id: string, payload: { name: string, comment: string }) => fetch(`/api/alerts/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json()),
    delete: (id: string) => fetch(`/api/alerts/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json()),
  },
};

export {
  connectionOptions,
  backendApi, 
};