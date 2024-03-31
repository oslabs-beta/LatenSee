import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Papa from 'papaparse';
import Chart from '../components/Chart';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((data) => data.json())
      .then((data) => {
        console.log('This is data from data.csv', data);
        setData(data);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  return (
    <div className="dashboard-page">
      <h1>This is chart</h1>
      {data ? (
        <Chart data={data} height={375} width="70%" />
      ) : (
        <div>Loading chart...</div>
      )}
      <h1>This is table</h1>
      {data ? (
        <FunctionPerformanceTable data={data} />
      ) : (
        <div>Loading table...</div>
      )}
    </div>
  );
}

export default Dashboard;
