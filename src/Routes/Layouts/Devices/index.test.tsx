import { render, screen } from '@testing-library/react';
import LayoutDevices from '.';

test('renders Layout devices', () => {
  render(<LayoutDevices />);
  const linkElement = screen.getByText(/App layout devices/i);
  expect(linkElement).toBeInTheDocument();
});
