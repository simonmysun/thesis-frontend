import { render, screen } from '@testing-library/react';
import Layout from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Layout', () => {
  render(<BrowserRouter><Layout /></BrowserRouter>);
  const linkElement = screen.getByText(/App layout/i);
  expect(linkElement).toBeInTheDocument();
});
