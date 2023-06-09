import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AlertEdit from '.';

test('renders Alert Edit', () => {
  render(<BrowserRouter><AlertEdit /></BrowserRouter>);
  const linkElement = screen.getByText(/App Alert Edit/i);
  expect(linkElement).toBeInTheDocument();
});
