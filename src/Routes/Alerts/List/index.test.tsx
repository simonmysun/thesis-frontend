import { render, screen } from '@testing-library/react';
import AlertList from '.';

test('renders Alert List', () => {
  render(<AlertList />);
  const linkElement = screen.getByText(/App Alert List/i);
  expect(linkElement).toBeInTheDocument();
});
