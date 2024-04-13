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

     // used to display date in chart as US format mm/dd uniformly accross all instances
    const formatDate = new Intl.DateTimeFormat('en-US', {day:'2-digit', month:'2-digit'})
    const formattedDateRange = `${formatDate.format(startDate)} - ${formatDate.format(endDate)}`;
    
    setDateRange(formattedDateRange);
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-content">
        <div className="summary-table">
          <div className='data-header'>
            <h3>
              Account Metrics
            </h3>
          </div>
          <div className='all-metrics'>
            <div className='summary-metric one'>
              <p>Functions Tracked</p>
              <h1>10</h1>
            </div>
            <div className='summary-metric'>
              <p>Daily Invocations</p>
              <h1>4500</h1>
            </div>
            <div className='summary-metric'>
              <p>Placeholder</p>
              <h1>10</h1>
            </div>
            <div className='summary-metric'>
              <p>Placeholder</p>
              <h1>10</h1>
            </div>
          </div>
        </div>
        <div className='function-metrics-container'>
        <div className='data-header'>
            <h3>
              Function Metrics
            </h3>
          </div>
        <div className='function-metrics'>
        
          <div className="chart-container">
            <div className='data-header'>
              <p className="chart-title">
              Average Lantency
            </p>
            <div className="export-button-wrapper">
              <ExportButton className="export-button" />
            </div>
            </div>
          
            {data ? (
              <Chart data={periodicData} height={375} width="100%" />
            ) : (
              <div>Loading chart...</div>
            )}
          </div>
          <div className="performance-table">
          <div className='data-header'>
            <p className="performance-table-title">
              Key Performance Metrics 
            </p> 
            <div className='period'><p>Period: {dateRange}</p></div>
          </div>
            {data ? (
              <FunctionPerformanceTable
                data={data}
                // width="calc(100% - 350px)"
              />
            ) : (
              <div>Loading table...</div>
            )}
          </div>
          <div className="pings-table">
            <div className='data-header'>
            <p >Recent Invocations</p>
            </div>
              {pingData ? (
                <LatestPingsTable
                  data={pingData}
                  // width="calc(100% - 350px)"
                />
              ) : (
                <div>Loading Ping Table...</div>
              )}
          </div>
        </div>
        </div>
        </div>
        {/* <div className="overview-panel">
          <div className="overview-content">
            <h1 className="overview-title">Overview</h1>
            {data ? (
              <OverviewPanel className="overview-panel" data={comparisonData} />
            ) : (
              <div>Loading overview...</div>
            )}
          </div>
        </div> */}
      </div>

    </>
  );
}

export default Dashboard;
