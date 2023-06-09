import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './';

test('renders learn react link', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = screen.getByText(/App index/i);
  expect(linkElement).toBeInTheDocument();
});
