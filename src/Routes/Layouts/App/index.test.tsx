import { render, screen } from '@testing-library/react';
import Layout from '.';

test('renders Layout', () => {
  render(<Layout />);
  const linkElement = screen.getByText(/App layout/i);
  expect(linkElement).toBeInTheDocument();
});
