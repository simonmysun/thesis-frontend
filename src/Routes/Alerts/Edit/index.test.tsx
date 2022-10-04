import { render, screen } from '@testing-library/react';
import AlertEdit from '.';

test('renders Alert Edit', () => {
  render(<AlertEdit />);
  const linkElement = screen.getByText(/App Alert Edit/i);
  expect(linkElement).toBeInTheDocument();
});
