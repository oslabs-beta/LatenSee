import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Chart from '../components/Chart';
import OverviewPanel from '../components/OverviewPanel';
import LatestPingsTable from '../components/LatestPingsTable';

function Dashboard() {
  const [data, setData] = useState([]);
  const [pingData, setPingData] = useState([]);
  const [periodicData, setPeriodicData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [dateRange, setDateRange] = useState('');

  //for FunctionPerformanceTable and LatestPingsTable
  useEffect(() => {
    fetch('/api/data')
      .then((data) => data.json())
      .then((data) => {
        setData(data[0]);
        setPingData(data[1]);
        console.log('newly added data: ', data[1]);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  //for Chart
  useEffect(() => {
    fetch('/api/period')
      .then((data) => data.json())
      .then((data) => {
        setPeriodicData(data);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  //for OverviewPanel
  useEffect(() => {
    fetch('/api/comps')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log('comparison data: ', data);
        setComparisonData(data);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  //for title of FunctionPerformanceTable
  useEffect(() => {
    // Date range calculation
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    const formatDate = (date) => {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const formattedDateRange = `${formatDate(startDate)} - ${formatDate(
      endDate
    )}`;
    setDateRange(formattedDateRange);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Average Latency Trends Across Functions</h1>
        <div className="chart">
          {data ? (
            <Chart data={periodicData} height={375} width="70%" />
          ) : (
            <div>Loading chart...</div>
          )}
        </div>
        <h1>Performance Table ({dateRange})</h1>
        <div className="table">
          {data ? (
            <FunctionPerformanceTable
              className="performance-table"
              data={data}
              width="calc(100% - 350px)"
            />
          ) : (
            <div>Loading table...</div>
          )}
        </div>
        <div className="ping-table">
          <h1>Ping Table</h1>
          {pingData ? (
            <LatestPingsTable data={pingData} />
          ) : (
            <div>Loading Ping Table...</div>
          )}
        </div>
        <div className="overview-panel">
          <h1>Overview</h1>
          {data ? (
            <OverviewPanel data={comparisonData} />
          ) : (
            <div>Loading overview...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
