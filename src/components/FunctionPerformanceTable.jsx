import React from 'react';

function FunctionPerformanceTable({ data }) {
  return (
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
            <td>{item.funcName}</td>
            <td>{item.firstRun}</td>
            <td>{item.timestamp}</td>
            <td>{item.serverDiff}</td>
            {/* <td>{item.averageLatency}</td>
            <td>{item.coldStartLatency}</td>
            <td>{item.warmStartLatency}</td>
            <td>{item.coldStartLatencyVsWarm}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FunctionPerformanceTable;
