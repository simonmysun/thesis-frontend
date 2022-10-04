import { render, screen } from '@testing-library/react';
import LayoutAlerts from '.';

test('renders Layout Alerts', () => {
  render(<LayoutAlerts />);
  const linkElement = screen.getByText(/App layout alerts/i);
  expect(linkElement).toBeInTheDocument();
});
