import { render, screen } from '@testing-library/react';
import Ridgeline from '.';

test('renders heatmap', () => {
  const currentData = [
    {
      tag: 'test',
      timestamp: new Date(),
      value: 0.3
    }
  ];
  const connectStatus = 'Connected';
  render(<Ridgeline currentData={currentData} connectStatus={connectStatus} sampleRate={1000}/>);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
