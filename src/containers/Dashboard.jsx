import React, { useContext } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Chart from '../components/Chart';
import OverviewPanel from '../components/OverviewPanel';
import ExportButton from '../components/ExportButton';
import LatestPingsTable from '../components/LatestPingsTable';
import { AllData } from '../App.jsx';

function Dashboard() {
  //destructure from Context
  const { data, pingData, periodicData, comparisonData, dateRange } =
  useContext(AllData);
  console.log('Dashboard mounted');
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
              />
            ) : (
              <div>Loading table...</div>
            )}
          </div>
          <h1 className="pings-table-title">Most Recent Pings</h1>
          <div className="pings-table">
            {pingData ? (
              <LatestPingsTable className="pings-table" data={pingData} />
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
