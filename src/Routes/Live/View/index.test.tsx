import { render, screen } from '@testing-library/react';
import LiveView from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Live View', () => {
  global.localStorage.setItem('settings', '{"mqttUrl":"wss://fake/mqtt","mqttUsername":"fake","mqttPassword":"fake"}');
  render(<BrowserRouter><LiveView /></BrowserRouter>);
  const linkElement = screen.getByText(/App LiveView/i);
  expect(linkElement).toBeInTheDocument();
});
