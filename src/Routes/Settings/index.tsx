import { useState, useEffect } from 'react';

import './style.css';

function Settings() {
  const stored = localStorage.getItem('settings');
  const [settings, setSettings] = useState<{ mqttUrl: string, mqttUsername: string, mqttPassword: string }>({
    mqttUrl: '',
    mqttUsername: '',
    mqttPassword: '',
  });
  useEffect(() => {
    const stored = localStorage.getItem('settings');
    if (stored === null) {
      localStorage.setItem('settings', JSON.stringify(settings));
    } else {
      setSettings(JSON.parse(stored));
    }
  }, []);
  const updateSettings = function() {
    setSettings({
      mqttUrl: (document.querySelector('#mqtt-url') as HTMLInputElement).value,
      mqttUsername: (document.querySelector('#mqtt-username') as HTMLInputElement).value,
      mqttPassword: (document.querySelector('#mqtt-password') as HTMLInputElement).value,
    });
    localStorage.setItem('settings', JSON.stringify({
      mqttUrl: (document.querySelector('#mqtt-url') as HTMLInputElement).value,
      mqttUsername: (document.querySelector('#mqtt-username') as HTMLInputElement).value,
      mqttPassword: (document.querySelector('#mqtt-password') as HTMLInputElement).value,
    }));
  };
  return (
    <div>
      <span className="hidden">App Settings</span>
      <h2>Settings</h2>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="mqtt-url" placeholder="/mqtt" value={ settings.mqttUrl } onChange={updateSettings}/>
        <label htmlFor="mqtt-url" className="form-label">MQTT Server URL</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="text" className="form-control" id="mqtt-username" placeholder="username" value={ settings.mqttUsername } onChange={updateSettings} />
        <label htmlFor="mqtt-username" className="form-label">MQTT Username</label>
      </div>
      <div className="mt-3 form-floating">
        <input type="password" className="form-control" id="mqtt-password" placeholder="************" value={ settings.mqttPassword } onChange={updateSettings} />
        <label htmlFor="mqtt-password" className="form-label">MQTT Password</label>
      </div>
    </div>
  );
}

export default Settings;
