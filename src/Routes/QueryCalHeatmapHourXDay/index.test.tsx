import { render, screen } from '@testing-library/react';
import QueryCalHeatmapHourXDay from '.';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

test('renders QueryCalHeatmapHourXDay', () => {
  render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ queryString: '' }} />}>
        <Route index element={<QueryCalHeatmapHourXDay />} />
      </Route>
    </Routes>
  </BrowserRouter>);
  const linkElement = screen.getByText(/QueryCalHeatmapHourXDay/i);
  expect(linkElement).toBeInTheDocument();
});
