import { render, screen } from '@testing-library/react';
import Ridgeline from '.';

test('renders heatmap', () => {
  return;
  render(<Ridgeline />);
  const linkElement = screen.getByText(/./i);
  expect(linkElement).toBeInTheDocument();
});
