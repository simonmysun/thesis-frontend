import { render, screen } from '@testing-library/react';
import LayoutQuery from '.';

test('renders Layout query', () => {
  render(<LayoutQuery />);
  const linkElement = screen.getByText(/App layout query/i);
  expect(linkElement).toBeInTheDocument();
});
