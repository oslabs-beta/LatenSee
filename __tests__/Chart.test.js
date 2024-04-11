import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from '../src/components/Chart';
// Mock ReactApexChart
jest.mock('react-apexcharts', () => <div>Chart</div>);

describe('Chart component', () => {
  test('displays loading when data is empty', () => {
    render(<Chart data={[]} height="500" />);
    expect(screen.getByText(/loading chart data.../i)).toBeInTheDocument();
  });

  test('renders chart when data is provided', () => {
    const mockData = [
      { day: 'Mon', value: 10 },
      { day: 'Tue', value: 20 },
    ];
    render(<Chart data={mockData} height="500" />);
    // Since ReactApexChart is mocked to just render "Chart", we check for that
    expect(screen.getByText('Chart')).toBeInTheDocument();
  });
});
