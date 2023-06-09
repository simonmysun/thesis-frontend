import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import DeviceEdit from '.';

test('renders Device Edit', () => {
  render(<BrowserRouter><DeviceEdit /></BrowserRouter>);
  const linkElement = screen.getByText(/App Device Edit/i);
  expect(linkElement).toBeInTheDocument();
});
