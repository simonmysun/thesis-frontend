import { render, screen } from '@testing-library/react';
import QueryHome from '.';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

test('renders QueryHome', () => {
  render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ queryString: '' }} />}>
        <Route index element={<QueryHome />} />
      </Route>
    </Routes>
  </BrowserRouter>);
  const linkElement = screen.getByText(/QueryHome/i);
  expect(linkElement).toBeInTheDocument();
});
