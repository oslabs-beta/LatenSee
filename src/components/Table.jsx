import React from 'react';

function Table({ data }) {
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
            <td>{item.functionName}</td>
            <td>{item.numberOfPings}</td>
            <td>{item.numberOfColdStarts}</td>
            <td>{item.coldStartPercentage}</td>
            <td>{item.averageLatency}</td>
            <td>{item.coldStartLatency}</td>
            <td>{item.warmStartLatency}</td>
            <td>{item.coldStartLatencyVsWarm}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;