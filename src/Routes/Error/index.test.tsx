import { render, screen } from '@testing-library/react';
import ErrorPage from '.';

test('renders Query', () => {
  render(<ErrorPage />);
  const linkElement = screen.getByText(/Oops/i);
  expect(linkElement).toBeInTheDocument();
});
