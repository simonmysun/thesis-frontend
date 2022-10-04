import { render, screen } from '@testing-library/react';
import LiveList from '.';

test('renders Live List', () => {
  render(<LiveList />);
  const linkElement = screen.getByText(/App Live List/i);
  expect(linkElement).toBeInTheDocument();
});
