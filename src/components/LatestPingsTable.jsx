import React from 'react';

// formatting numbers with comma and decimal
const numFormat = new Intl.NumberFormat('US-en', { minimumFractionDigits: 1 });
// formatting date
const dateFormat = new Intl.DateTimeFormat('US-en', {
  dateStyle: 'short',
  timeStyle: 'medium',
});

function LatestPingsTable({ data, width, className }) {
  //function to get only the last five pings data
  const getLastFivePings = (data) => {
    const result = [];
    for (let i = data.length - 1; i >= 0 && result.length < 5; i--) {
      result.push(data[i]);
    }
    return result;
  };

  const lastFivePings = getLastFivePings(data);
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
              <td>{dateFormat.format(ping.serverStart)}</td>
              <td>{dateFormat.format(ping.serverEnd)}</td>
              <td>{numFormat.format(ping.serverDifference)}</td>
              <td>{coldStartYN(ping.firstRun)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LatestPingsTable;
