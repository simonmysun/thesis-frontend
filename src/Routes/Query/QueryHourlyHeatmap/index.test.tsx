import { render, screen } from '@testing-library/react';
import QueryHourlyHeatmap from '.';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

test('renders QueryHourlyHeatmap', () => {
  render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ queryString: '' }} />}>
        <Route index element={<QueryHourlyHeatmap />} />
      </Route>
    </Routes>
  </BrowserRouter>);
  const linkElement = screen.getByText(/QueryHourlyHeatmap/i);
  expect(linkElement).toBeInTheDocument();
});
