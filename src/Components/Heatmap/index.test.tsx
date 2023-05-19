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
  const connectStatus = 'Connected';
  render(<Heatmap currentData={ currentData } connectStatus={ connectStatus } sampleRate={ 1000 }/>);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
