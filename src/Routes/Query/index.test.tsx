import { render, screen } from '@testing-library/react';
import Query from '.';

test('renders Query', () => {
  render(<Query />);
  const linkElement = screen.getByText(/App Query/i);
  expect(linkElement).toBeInTheDocument();
});
