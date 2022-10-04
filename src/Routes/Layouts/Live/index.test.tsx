import { render, screen } from '@testing-library/react';
import LayoutLive from '.';

test('renders Layout live', () => {
  render(<LayoutLive />);
  const linkElement = screen.getByText(/App layout live/i);
  expect(linkElement).toBeInTheDocument();
});
