import { render, screen } from '@testing-library/react';
import DeviceList from '.';

test('renders Device List', () => {
  render(<DeviceList />);
  const linkElement = screen.getByText(/App Device List/i);
  expect(linkElement).toBeInTheDocument();
});
