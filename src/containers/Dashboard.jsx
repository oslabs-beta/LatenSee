import React, { useContext } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Chart from '../components/Chart';
import ColdStartPercentage from '../components/ColdStartPercentage';
import SpeedPerformance from '../components/SpeedPerformance';
import OverviewPanel from '../components/OverviewPanel';
import ExportButton from '../components/ExportButton';
import LatestPingsTable from '../components/LatestPingsTable';

// formatting numbers with comma and decimal
const numFormat = new Intl.NumberFormat('US-en')
import { AllData } from '../App.jsx';

function Dashboard() {
  //destructure from Context
  const { data, pingData, periodicData, comparisonData, dateRange, acctData } =
    useContext(AllData);
  console.log('Dashboard mounted');
  return (
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
                <h1>{acctData[0] ? numFormat.format(acctData[0]) : 0 }</h1>
              </div>
              <div className='summary-metric'>
                <p>Active Function Invocations</p>
                <h1>{acctData[1] ? numFormat.format(acctData[1]) : 0}</h1>
              </div>
              <div className='summary-metric'>
                <p>Daily Invocations</p>
                <h1>{periodicData[0] ? numFormat.format(periodicData[0]['dayCount']) : 0}</h1>
              </div>
              {/* <div className='summary-metric'>
                <p>Placeholder</p>
                <h1>10</h1>
              </div> */}
            </div>
          </div>
        <div className='function-metrics-container'>
          <div className='data-header'>
              <h3>
                Function Metrics
              </h3>
            </div>
            <div className='all-metrics'>
            <div className='summary-metric one'>
                  <p>Cold Starts Weekly Change </p>
                  <h1><ColdStartPercentage
              data = {comparisonData}
            /></h1>
          </div>
          <div className='summary-metric'>
                  <p>Average Latency Weekly Change</p> 
                  <h1><SpeedPerformance
                  data = {comparisonData}/>         
            </h1>
            </div> 
            <div className='summary-metric'>
                  <p>Max Average Latency</p>
                  <h1>{comparisonData[0]? `${numFormat.format(comparisonData[0]['maxLatency'])} ms` : '-' }</h1>
                  <p className='bottom-p'> {comparisonData[0]? `for function '${comparisonData[0]['maxLatFunc']}'` : ''}</p>
            </div> 
          </div>
          <div className='function-metrics'>

          <div className="chart-container">
            <div className='data-header'>
              <p className="chart-title">
              Average Lantency by Function
              </p>
            </div>
            {data ? (
              <Chart data={periodicData} height={375} width="100%" />
            ) : (
              <div className='data-loading'>Loading chart...</div>
            )}
          </div>

          <div className="chart-container two">
          <div className='data-header'>
              <p className="chart-title">
              Total Average Latency 
            </p>
          </div>
            {data ? (
              <OverviewPanel className="overview-panel" 
              data={comparisonData}
              periodicData={periodicData}
              />
            ) : (
              <div className='data-loading'>Loading overview...</div>
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
              />
            ) : (
              <div className='data-loading'>Loading table...</div>
            )}
          </div>
          <div className="pings-table">
            <div className='data-header'>
            <p>Recent Invocations</p>
            <div className="export-button-wrapper">
                <ExportButton className="export-button" />
              </div>
            </div>
              {pingData ? (
                <LatestPingsTable
                  data={pingData}
                />
              ) : (
                <div className='data-loading'>Loading table...</div>
              )}
          </div>
        </div>
        </div>
        </div>
      </div>
  );
}

export default Dashboard;
