import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Chart from '../components/Chart';
import OverviewPanel from '../components/OverviewPanel';

function Dashboard() {
  const [data, setData] = useState([]);
  const [periodicData, setPeriodicData] = useState([]);

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

  useEffect(() => {
    fetch('/api/period')
      .then((data) => data.json())
      .then((data) => {
        console.log('This is data from data.csv', data);
        setPeriodicData(data);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>This is chart</h1>
        <div className="chart">
          {data ? (
            <Chart data={periodicData} height={375} width="70%" />
          ) : (
            <div>Loading chart...</div>
          )}
        </div>
        <h1>This is table</h1>
        <div className="table">
          {data ? (
            <FunctionPerformanceTable data={data} />
          ) : (
            <div>Loading table...</div>
          )}
        </div>

        <div className="overview-panel">
          <h1>This is Overview</h1>
          {data ? (
            <OverviewPanel data={data} />
          ) : (
            <div>Loading overview...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
