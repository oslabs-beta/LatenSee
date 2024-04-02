import React from 'react';

function FunctionPerformanceTable({ data, width }) {
  console.log('props data', data);

  const tableStyle = {
    width: width,
    overflowX: 'auto',
  };

  return (
    <div style={tableStyle}>
      <table>
        <thead>
          <tr>
            <th>Function</th>
            <th>Number of Pings</th>
            <th>Number Of Cold Starts</th>
            <th>Cold Start %</th>
            <th>Average Latency</th>
            <th>Cold Start Latency</th>
            <th>Warm Start Latency</th>
            <th>Cold Start Latency vs Warm</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.totalRuns}</td>
              <td>{item.coldStarts}</td>
              <td>{(item.percentCold * 100).toFixed(1)}</td>
              <td>{item.aveLatency.toFixed(1)}</td>
              <td>{item.coldLatency.toFixed(1)}</td>
              <td>{item.warmLatency.toFixed(1)}</td>
              <td>{item.coldToWarm.toFixed(1)}</td>
              {/* <td>{item.timestamp}</td>
            <td>{item.serverDiff}</td> */}
              {/* <td>{item.averageLatency}</td>
            <td>{item.coldStartLatency}</td>
            <td>{item.warmStartLatency}</td>
            <td>{item.coldStartLatencyVsWarm}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FunctionPerformanceTable;
