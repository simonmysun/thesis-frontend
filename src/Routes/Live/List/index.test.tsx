import { render, screen } from '@testing-library/react';
import LiveList from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Live List', () => {
  global.localStorage.setItem('settings', '{"mqttUrl":"wss://fake/mqtt","mqttUsername":"fake","mqttPassword":"fake"}');
  render(<BrowserRouter><LiveList /></BrowserRouter>);
  const linkElement = screen.getByText(/App Live List/i);
  expect(linkElement).toBeInTheDocument();
});
