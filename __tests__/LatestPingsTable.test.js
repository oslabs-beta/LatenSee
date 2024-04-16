import React from 'react';
import { render, screen } from '@testing-library/react';
import LatestPingsTable from '../src/components/LatestPingsTable';

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
  render(
    <LatestPingsTable data={mockData} width="100%" className="pings-table" />
  );

  const table = screen.getByTestId('pings-table');
  const header = table.querySelector('thead tr');
  const expectedHeaders = [
    'Function',
    'Invocation Start',
    'Invocation End',
    'Latency',
    'Coldstart',
  ];
  expectedHeaders.forEach((text, index) => {
    expect(header.children[index].textContent).toBe(text);
  });

  const bodyFirstRow = table.querySelector('tbody tr');
  const bodyFirstRowCells = bodyFirstRow.querySelectorAll('td');
  const latestData = mockData[mockData.length - 1];

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

  expectedValues.forEach((value, index) => {
    expect(bodyFirstRowCells[index].textContent).toBe(value);
  });
});
