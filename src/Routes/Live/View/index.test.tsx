import { render, screen } from '@testing-library/react';
import LiveView from '.';

test('renders Live View', () => {
  render(<LiveView />);
  const linkElement = screen.getByText(/App LiveView/i);
  expect(linkElement).toBeInTheDocument();
});
