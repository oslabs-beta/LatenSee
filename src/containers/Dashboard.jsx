import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Papa from 'papaparse';
// import Chart from '../components/Chart';

function Dashboard() {
  // const myArray = [
  //   {
  //     funcName: 'function1',
  //     firstRun: 'true',
  //     timestamp: '2024-03-20 04:35:00+00',
  //     serverDiff: '988',
  //   },
  //   {
  //     funcName: 'function2',
  //     firstRun: 'false',
  //     timestamp: '2024-03-20 04:35:00+00',
  //     serverDiff: '188',
  //   },
  //   {
  //     funcName: 'function3',
  //     firstRun: 'true',
  //     timestamp: '2024-03-20 04:35:00+00',
  //     serverDiff: '38',
  //   },
  // ];
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
    .then((data)=> data.json())
    .then((data=> {
      console.log("our data", data)
      setData(data)
    }))
    .catch (error => {
        console.log('Failed to load data', error);
      }
      )},[]);

  // fetch('/config', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => console.log(' add func fetch /config: ERROR: ', err));

  return (
    <div className="dashboard-page">
      <h1>This is graph</h1>
      {/* <Graph data={data}/> */}
      {/* <Chart /> */}
      <h1>This is table</h1>
      <h1>This data</h1>
      <FunctionPerformanceTable data={data} />
    </div>
  );
}

export default Dashboard;
