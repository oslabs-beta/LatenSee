import React from 'react';

function LatestPingsTable({ data }) {
  // Reverse to start with the last element and slice to get the last 5 items
  const lastFivePings = [...data].reverse().slice(0, 5);
  const coldStartYN = (value) => (value === '1' ? 'Yes' : 'No');

  return (
    <div className="latest-pings-table">
      <h2>Last 5 Pings</h2>
      <table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Coldstart</th>
            <th>Invoke Time</th>
            <th>Server Start</th>
            <th>Server End</th>
            <th>Latency</th>
          </tr>
        </thead>
        <tbody>
          {lastFivePings.map((ping, index) => (
            <tr key={index}>
              <td>{ping.name}</td>
              <td>{coldStartYN(ping.firstRun)}</td>
              <td>{new Date(parseInt(ping.invokeTime)).toLocaleString()}</td>
              <td>{new Date(parseInt(ping.serverStart)).toLocaleString()}</td>
              <td>{new Date(parseInt(ping.serverEnd)).toLocaleString()}</td>
              <td>{ping.serverDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestPingsTable;
