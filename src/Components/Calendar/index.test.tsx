import { render, screen } from '@testing-library/react';
import Calendar from '.';

test('renders calendar', () => {
  const currentData = [
    {
      tag: 'test',
      timestamp: new Date(),
      value: 0.3
    }
  ];
  const startDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365);
  const endDate = new Date();
  render(<Calendar currentData={ currentData } startDate={ startDate } endDate={ endDate }/>);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
