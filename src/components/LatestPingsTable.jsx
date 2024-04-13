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
    <div style={pingTableStyle} className="table-inner-container">
      <table className={className}>
        <thead>
          <tr>
            <th>Function</th>
            <th>Invocation Start</th>
            <th>Invocation End</th>
            <th>Latency</th>
            <th>Coldstart</th>
          </tr>
        </thead>
        <tbody>
          {lastFivePings.map((ping, index) => (
            <tr key={index}>
              <td>{ping.name}</td>
              <td>{new Date(parseInt(ping.serverStart)).toLocaleString()}</td>
              <td>{new Date(parseInt(ping.serverEnd)).toLocaleString()}</td>
              <td>{ping.serverDifference}</td>
              <td>{coldStartYN(ping.firstRun)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestPingsTable;
