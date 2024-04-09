import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Chart from '../components/Chart';
import OverviewPanel from '../components/OverviewPanel';
import ExportButton from '../components/ExportButton';
import LatestPingsTable from '../components/LatestPingsTable';

function Dashboard() {
  //FunctionPerformanceTable
  const [data, setData] = useState([]);
  //LatestPingsTable
  const [pingData, setPingData] = useState([]);
  //Chart
  const [periodicData, setPeriodicData] = useState([]);
  //OverviewPanel
  const [comparisonData, setComparisonData] = useState([]);
  //title for FunctionPerformanceTable
  const [dateRange, setDateRange] = useState('');

  //data fetched for FunctionPerformanceTable and LatestPingsTable
  useEffect(() => {
    fetch('/api/data')
      .then((data) => data.json())
      .then((data) => {
        setData(data[0]);
        setPingData(data[1]);
        // console.log('newly added data: ', data[1]);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  //data fetched for Chart and DailyPerformance
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

  //data fetched for OverviewPanel
  useEffect(() => {
    fetch('/api/comps')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        // console.log('comparison data: ', data);
        setComparisonData(data);
      })
      .catch((error) => {
        console.log('Failed to load data', error);
      });
  }, []);

  //data fetched for title of FunctionPerformanceTable
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
    <>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1 className="chart-title">
            Average Latency Trends Across Functions
          </h1>
          <div className="export-button-wrapper">
            <ExportButton className="export-button" />
          </div>
          <div className="chart">
            {data ? (
              <Chart data={periodicData} height={375} width="100%" />
            ) : (
              <div>Loading chart...</div>
            )}
          </div>
          <h1 className="performance-table-title">
            Performance Table ({dateRange})
          </h1>
          <div className="performance-table">
            {data ? (
              <FunctionPerformanceTable
                className="performance-table"
                data={data}
                // width="calc(100% - 350px)"
              />
            ) : (
              <div>Loading table...</div>
            )}
          </div>
          <h1 className="pings-table-title">Most Recent Pings</h1>
          <div className="pings-table">
            {pingData ? (
              <LatestPingsTable
                className="pings-table"
                data={pingData}
                // width="calc(100% - 350px)"
              />
            ) : (
              <div>Loading Ping Table...</div>
            )}
          </div>
        </div>
      </div>
      <div className="overview-panel">
        <div className="overview-content">
          <h1 className="overview-title">Overview</h1>
          {data ? (
            <OverviewPanel
              className="overview-panel"
              data={comparisonData}
              periodicData={periodicData}
            />
          ) : (
            <div>Loading overview...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
