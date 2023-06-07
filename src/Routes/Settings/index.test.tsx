import { render, screen } from '@testing-library/react';
import Settings from '.';

test('renders Settings', () => {
  render(<Settings />);
  const linkElement = screen.getByText(/App Settings/i);
  expect(linkElement).toBeInTheDocument();
});
