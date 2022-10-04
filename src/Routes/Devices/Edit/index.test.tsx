import { render, screen } from '@testing-library/react';
import DeviceEdit from '.';

test('renders Device Edit', () => {
  render(<DeviceEdit />);
  const linkElement = screen.getByText(/App Device Edit/i);
  expect(linkElement).toBeInTheDocument();
});
