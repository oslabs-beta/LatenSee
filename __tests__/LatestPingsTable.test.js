import React from 'react';
import { render, screen } from '@testing-library/react';
import LatestPingsTable from '../src/components/LatestPingsTable';

//create mock data for testing
const mockData = [
  {
    name: 'Function 1',
    serverStart: new Date('2024-04-17T04:17:40'),
    serverEnd: new Date('2024-04-17T04:17:45'),
    serverDifference: 555.0,
    firstRun: 'true',
  },
  {
    name: 'Function 2',
    serverStart: new Date('2024-04-16T03:15:30'),
    serverEnd: new Date('2024-04-16T03:15:35'),
    serverDifference: 450.0,
    firstRun: 'no',
  },
];

test('renders LatestPingsTable with data', () => {
  //render LatestPingsTable passing mockData
  render(<LatestPingsTable data={mockData} />);
  //get table by testid (added to component as an attribure)
  const table = screen.getByTestId('pings-table');
  //from table, get header cells (all) by tags
  const headerCells = table.querySelectorAll('thead tr th');
  //an array of strings expected to show up in header
  const expectedHeaders = [
    'Function',
    'Invocation Start',
    'Invocation End',
    'Latency',
    'Coldstart',
  ];
  //iterate over headerCells, check to see if each cell's text is aligned with expectedHeaders
  headerCells.forEach((cell, index) => {
    expect(cell.textContent).toBe(expectedHeaders[index]);
  });
  //from table, get all cells across all rows in body by tags
  const bodyCells = table.querySelectorAll('tbody tr td');
  //for this test we use the second object in mockData
  const latestData = mockData[1];

  const expectedValues = [
    latestData.name,
    `${latestData.serverStart.toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'numeric',
      day: '2-digit',
    })}, ${latestData.serverStart.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })}`,
    `${latestData.serverEnd.toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'numeric',
      day: '2-digit',
    })}, ${latestData.serverEnd.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })}`,
    `${latestData.serverDifference.toFixed(1)}`,
    latestData.firstRun === 'true' ? 'Yes' : 'No',
  ];
  //iterate over expectedValues array, check to see if each body cell's content is aligned with expectedValues
  expectedValues.forEach((value, index) => {
    expect(bodyCells[index].textContent).toBe(value);
  });
});
