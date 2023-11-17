import { render, screen } from '@testing-library/react';
import QueryStatusTimeline from '.';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

test('renders QueryStatusTimeline', () => {
  render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet context={{ queryString: '' }} />}>
        <Route index element={<QueryStatusTimeline />} />
      </Route>
    </Routes>
  </BrowserRouter>);
  const linkElement = screen.getByText(/QueryStatusTimeline/i);
  expect(linkElement).toBeInTheDocument();
});
