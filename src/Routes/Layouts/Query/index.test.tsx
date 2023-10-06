import { render, screen } from '@testing-library/react';
import LayoutQuery from '.';
import { BrowserRouter } from 'react-router-dom';

test('renders Layout query', () => {
  render(<BrowserRouter><LayoutQuery /></BrowserRouter>);
  const linkElement = screen.getByText(/App layout query/i);
  expect(linkElement).toBeInTheDocument();
});
