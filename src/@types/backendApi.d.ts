type SettingsObject = {
  mqttUrl: string,
  mqttUsername: string,
  mqttPassword: string
};

type DeviceObject = {
  name: string,
  comment: string
}

type AlertObject = {
  name: string,
  comment: string,
  lastFired: string
  rule: {
    alertName: string,
    expression: string,
    for: string,
    labels: {
      severity: string
    },
    annotations: {
      summary: string,
      description: string
    }
  }
};