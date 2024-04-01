import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Papa from 'papaparse';
// import Chart from '../components/Chart';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((data) => data.json())
      .then((data) => {
        console.log('our data', data);
        setData(data);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  return (
    <div className="dashboard-page">
      <h1>This is graph</h1>
      <h1>This is table</h1>
      <h1>This data</h1>
      <FunctionPerformanceTable data={data} />
    </div>
  );
}

export default Dashboard;
