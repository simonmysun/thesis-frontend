import { render, screen } from '@testing-library/react';
import Heatmap from '.';

test('renders heatmap', () => {
  render(<Heatmap />);
  const linkElement = screen.getByText(/./i);
  expect(linkElement).toBeInTheDocument();
});
