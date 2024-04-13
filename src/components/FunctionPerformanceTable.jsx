import React from 'react';

function FunctionPerformanceTable({ data, width, className }) {

  const tableStyle = {
    width: width,
    overflowX: 'auto',
  };

  return (
    <div className='table-inner-container'style={tableStyle}>
      <table className={className} data-testid="performance-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Number of Pings</th>
            <th>Number of Cold Starts</th>
            <th>Cold Start %</th>
            <th>Average Latency</th>
            <th>Cold Start Latency</th>
            <th>Warm Start Latency</th>
            <th>Cold vs Warm Latency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.totalRuns}</td>
              <td>{item.coldStarts}</td>
              <td>{(item.percentCold * 100).toFixed(1)}</td>
              <td>{item.aveLatency? item.aveLatency.toFixed(1): 0}</td>
              <td>{item.coldLatency? item.coldLatency.toFixed(1): 0}</td>
              <td>{item.warmLatency? item.warmLatency.toFixed(1): 0 }</td>
              <td>{item.coldToWarm? item.coldToWarm.toFixed(1): 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FunctionPerformanceTable;
