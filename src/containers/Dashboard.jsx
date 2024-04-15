import React, { useContext } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Chart from '../components/Chart';
import ColdStartPercentage from '../components/ColdStartPercentage';
import SpeedPerformance from '../components/SpeedPerformance';
import OverviewPanel from '../components/OverviewPanel';
import ExportButton from '../components/ExportButton';
import LatestPingsTable from '../components/LatestPingsTable';
import { AllData } from '../App.jsx';

// formatting numbers with comma and decimal
const numFormat = new Intl.NumberFormat('US-en')

function Dashboard() {
<<<<<<< HEAD
  //destructure from Context
  const { data, pingData, periodicData, comparisonData, dateRange } =
  useContext(AllData);
  console.log('Dashboard mounted');
=======
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
  // data on overall account (number of funcs tracked, number thats is turned on)
  const [acctData, setAcctData] = useState('');

  //data fetched for FunctionPerformanceTable and LatestPingsTable
  useEffect(() => {
    fetch('/api/data')
      .then((data) => data.json())
      .then((data) => {
        setData(data[0]);
        setPingData(data[1]);
        setAcctData(data[2])
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


  console.log('comp data', periodicData)

>>>>>>> dev
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
<<<<<<< HEAD
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
=======
              <OverviewPanel className="overview-panel" 
>>>>>>> dev
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
        {/* <div className="overview-panel">
          <div className="overview-content">
            <h1 className="overview-title">Overview</h1>
            {data ? (
              <OverviewPanel className="overview-panel" 
              data={comparisonData}
              periodicData={periodicData}
              />
            ) : (
              <div className='data-loading'>Loading overview...</div>
            )}
          </div>
        </div> */}
      </div>
  );
}

export default Dashboard;
