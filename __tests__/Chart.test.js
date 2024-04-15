import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from '../src/components/Chart';
import '@testing-library/jest-dom';

//mock the 'react-apexcharts' module. Any ApexChart rendering in this file will be replaced by this mock chart
jest.mock('react-apexcharts', () => {
  //define MockChart, passing props to MockChart just like how the actaul Chart component behaves
  return function MockChart(props) {
    return <div data-testid="mock-chart">{JSON.stringify(props)}</div>;
  };
});

test('displays message when data array is empty', () => {
  //render Chart component and store in fakeChart variable as object (intercepted by the MockChart)
  const fakeChart = render(<Chart data={[]} height={400} />);
  const message = fakeChart.getByText('Loading chart data...');
  expect(message).toBeInTheDocument();
});

test('renders chart correctly with data', () => {
  const mockData = [
    { day: 'Monday', latency: 30.0 },
    { day: 'Tuesday', latency: 40.0 },
  ];

  render(<Chart data={mockData} height={400} />);
  const chart = screen.getByTestId('mock-chart');

  // converting data in chart back to normal javascript
  const props = JSON.parse(chart.textContent);
  console.log('i am props: ', props);
  expect(props.series).toEqual([{ name: 'latency', data: ['40.0', '30.0'] }]);
  expect(props.options.xaxis.categories).toEqual(['Tuesday', 'Monday']);
});
