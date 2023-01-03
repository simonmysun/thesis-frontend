import { render, screen } from '@testing-library/react';
import Heatmap from '.';

test('renders heatmap', () => {
  const currentData = [
    {
      tag: 'test',
      timestamp: new Date(),
      value: 0.3
    }
  ];
  const retention = 30;
  const socketConnected = true;
  render(<Heatmap currentData={currentData} retention={retention} socketConnected={socketConnected}/>);
  const linkElement = screen.getAllByText(/./i)[0];
  expect(linkElement).toBeInTheDocument();
});
