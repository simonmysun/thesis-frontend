import { render, screen } from '@testing-library/react';
import DeviceList from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Device List', () => {
  render(<BrowserRouter><DeviceList /></BrowserRouter>);
  const linkElement = screen.getByText(/App Device List/i);
  expect(linkElement).toBeInTheDocument();
});
