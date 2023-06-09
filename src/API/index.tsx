import { v4 } from 'uuid';

const mqttApi = {
  getSettings: function (): { mqttUsername: string, mqttPassword: string, mqttClientId: string, mqttUrl: string } {
    const stored = localStorage.getItem('settings');
    if(stored === null) {
      return {
        mqttUsername: '',
        mqttPassword: '',
        mqttClientId: `isc_frontend_${v4()}`,
        mqttUrl: ''
      };
    } else {
      const settings = JSON.parse(stored);
      return {
        mqttUsername: settings.mqttUsername,
        mqttPassword: settings.mqttPassword,
        mqttClientId: `isc_frontend_${v4()}`,
        mqttUrl: settings.mqttUrl
      };
    }
  }
};

const backendApi = {
  devices: {
    list: () => fetch('/api/devices').then(res => res.json()),
    query: (id: string) => fetch(`/api/devices/${id}`).then(res => res.json()),
    modify: (id: string, payload: DeviceObject) => fetch(`/api/devices/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json()),
    add: (id: string, payload: DeviceObject) => fetch(`/api/devices/${id}`, {
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
    modify: (id: string, payload: AlertObject) => fetch(`/api/alerts/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => res.json()),
    add: (id: string, payload: AlertObject) => fetch(`/api/alerts/${id}`, {
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
  mqttApi,
  backendApi,
};