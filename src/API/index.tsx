import { v4 } from 'uuid';

const mqttApi = {
  getSettings: function (): { mqttUsername: string, mqttPassword: string, mqttClientId: string, mqttUrl: string } {
    const stored = localStorage.getItem('settings');
    if (stored === null) {
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
    list: () => fetch('/api/devices').then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    query: (id: string) => fetch(`/api/devices/${id}`).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    modify: (id: string, payload: DeviceObject) => fetch(`/api/devices/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    add: (id: string, payload: DeviceObject) => fetch(`/api/devices/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    delete: (id: string) => fetch(`/api/devices/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
  },
  alerts: {
    list: () => fetch('/api/alerts').then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    query: (id: string) => fetch(`/api/alerts/${id}`).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    modify: (id: string, payload: AlertObject) => fetch(`/api/alerts/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    add: (id: string, payload: AlertObject) => fetch(`/api/alerts/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
    delete: (id: string) => fetch(`/api/alerts/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then(res => res.json()),
  },
  reloadAlertManager: () => fetch('/api/reload').then(function (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return new Promise<string>(resolve => resolve('Success!'));
  }).catch(err => {
    console.log(err);
    return new Promise<string>((_, reject) => reject('Failed!'));
  })
};

const grafanaApi = {
  endPoint: `https://thesis-backend-grafana-mys-karlsruhe-0.makelove.expert/d-solo/s4WuoHlVz/indoor-sound-classification`,
};

const tagList = ['Alarmsignal', 'AstmaHusten', 'Blending', 'Bohren', 'CovidHusten', 'Doseöffnen', 'Electronic_Zahnbürste', 'Etwas-am-Boden-ziehen', 'Fenster', 'Feuerzeug', 'Flöte', 'Fußstapfen-gehen', 'GesunderHusten', 'Gitarre', 'Glas', 'Haartrockner', 'Hahn', 'Handsäge', 'Huhn', 'Hund', 'Katze', 'Klarinette', 'Klassenname', 'klatschen', 'Klingelton', 'Küssen', 'Lachen', 'Mausklick', 'Metall-auf-Metall', 'Möbelrücken', 'Niesen', 'Pfeifen', 'Presslufthammer', 'Ruhe', 'Schlag', 'Schlagzeug', 'Schnarchen', 'Sirene', 'Sitar', 'SprechendeFrau', 'SprechenderMann', 'Staubsauger', 'Tastatur-tippen', 'Toilettenspülung', 'Trampler', 'Trinken', 'Türklingel', 'Türklopfen', 'Uhr-ticken', 'Vandalismus', 'Waschmaschine', 'Wasser', 'Weinen', 'Wimmern', 'Wind', 'Zahnbürste', 'Zerbrechen', 'ZwitscherndeVögel'];

export {
  mqttApi,
  backendApi,
  grafanaApi,
  tagList,
};