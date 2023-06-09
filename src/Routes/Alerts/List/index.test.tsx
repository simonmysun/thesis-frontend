import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertList from '.';

test('renders Alert List', () => {
  render(<BrowserRouter><AlertList /></BrowserRouter>);
  const linkElement = screen.getByText(/App Alert List/i);
  expect(linkElement).toBeInTheDocument();
});
