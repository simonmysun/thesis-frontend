import { render, screen } from '@testing-library/react';
import LayoutSettings from '.';

test('renders Layout settings', () => {
  render(<LayoutSettings />);
  const linkElement = screen.getByText(/App layout settings/i);
  expect(linkElement).toBeInTheDocument();
});
