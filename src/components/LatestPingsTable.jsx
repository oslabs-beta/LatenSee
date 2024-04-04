import React from 'react';

function LatestPingsTable({ data, width, className }) {
  // Reverse to start with the last element and slice to get the last 5 items
  const lastFivePings = [...data].reverse().slice(0, 5);
  const coldStartYN = (value) => (value == 'true' ? 'Yes' : 'No');
  const pingTableStyle = {
    width: width,
    overflowX: 'auto',
  };

  return (
    <div style={pingTableStyle} className="latest-pings-table">
      <table className={className}>
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
