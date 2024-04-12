import React from 'react';
import { render, screen } from '@testing-library/react';
import FunctionPerformanceTable from '../src/components/FunctionPerformanceTable';

// fake data for rendering the table
const mockData = [
  {
    name: 'Function 1',
    totalRuns: 100,
    coldStarts: 20,
    percentCold: 0.2,
    aveLatency: 50,
    coldLatency: 100,
    warmLatency: 20,
    coldToWarm: 80,
  },
  {
    name: 'Function 2',
    totalRuns: 50,
    coldStarts: 5,
    percentCold: 0.1,
    aveLatency: 30,
    coldLatency: 70,
    warmLatency: 10,
    coldToWarm: 60,
  },
];

test('renders FunctionPerformanceTable with data', () => {
  //simulate the mounting of component in jsdom. once it is rendered successfully, we are able to run further testing
  render(
    <FunctionPerformanceTable
      data={mockData}
      width="100%"
      className="performance-table"
    />
  );

  //divide table into 2 parts for testing: header and body. (header is usually static, body is dynamic)
  //get whole table element by testid (which is an attribute added to FunctionPerformnaceTable <table>)
  const table = screen.getByTestId('performance-table');
  //within table element, get first row of header by tags (we only have one row of header)
  const header = table.querySelector('thead tr');
  //what we expect header content to be
  const expectedHeaders = [
    'Function',
    'Number of Pings',
    'Number of Cold Starts',
    'Cold Start %',
    'Average Latency',
    'Cold Start Latency',
    'Warm Start Latency',
    'Cold vs Warm Latency',
  ];
  //testing each header cell (header.children)'s content to see if they are same as current element in expectedHeaders
  expectedHeaders.forEach((text, index) => {
    expect(header.children[index].textContent).toBe(text);
  });

  //wihtin table element, get first row of table body by tags
  const bodyFirstRow = table.querySelector('tbody tr');
  //within first row of table body, get all table body cells by tag
  const bodyFirstRowCells = bodyFirstRow.querySelectorAll('td');
  // what we expect table body cell to be
  const expectedValues = [
    mockData[0].name,
    mockData[0].totalRuns.toString(),
    mockData[0].coldStarts.toString(),
    (mockData[0].percentCold * 100).toFixed(1),
    mockData[0].aveLatency.toFixed(1),
    mockData[0].coldLatency.toFixed(1),
    mockData[0].warmLatency.toFixed(1),
    mockData[0].coldToWarm.toFixed(1),
  ];
  //testing each table body cell's content to see if they are same as current element in expectedValues
  expectedValues.forEach((value, index) => {
    expect(bodyFirstRowCells[index].textContent).toBe(value);
  });
});
