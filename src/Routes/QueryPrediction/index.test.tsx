import { render, screen } from '@testing-library/react';
import QueryPrediction from '.';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

test('renders QueryPrediction', () => {
  render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ queryString: '' }} />}>
        <Route index element={<QueryPrediction />} />
      </Route>
    </Routes>
  </BrowserRouter>);
  const linkElement = screen.getByText(/QueryPrediction/i);
  expect(linkElement).toBeInTheDocument();
});
