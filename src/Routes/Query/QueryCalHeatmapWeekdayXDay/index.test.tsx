import { render, screen } from '@testing-library/react';
import QueryCalHeatmapWeekdayXDay from '.';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

test('renders QueryCalHeatmapWeekdayXDay', () => {
  render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ queryString: '' }} />}>
        <Route index element={<QueryCalHeatmapWeekdayXDay />} />
      </Route>
    </Routes>
  </BrowserRouter>);
  const linkElement = screen.getByText(/QueryCalHeatmapWeekdayXDay/i);
  expect(linkElement).toBeInTheDocument();
});
