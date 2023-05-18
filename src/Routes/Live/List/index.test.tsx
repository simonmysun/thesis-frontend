import { render, screen } from '@testing-library/react';
import LiveList from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Live List', () => {
  render(<BrowserRouter><LiveList /></BrowserRouter>);
  const linkElement = screen.getByText(/App Live List/i);
  expect(linkElement).toBeInTheDocument();
});
