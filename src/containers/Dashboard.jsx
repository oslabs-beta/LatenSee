import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Papa from 'papaparse';
// import Chart from '../components/Chart';

function Dashboard() {
  const myArray = [
    {
      funcName: '10second',
      numberOfPings: '8640',
      numberOfColdStarts: '5',
      coldStartPercentage: '0.05',
      averageLatency: '400',
      coldStartLatency: '600',
      warmStartLatency: '150',
    },
    {
      funcName: '1minute',
      numberOfPings: '1440',
      numberOfColdStarts: '7',
      coldStartPercentage: '0.4',
      averageLatency: '438',
      coldStartLatency: '571',
      warmStartLatency: '167',
    },
    {
      funcName: '5minutes',
      numberOfPings: '288',
      numberOfColdStarts: '6',
      coldStartPercentage: '2',
      averageLatency: '381',
      coldStartLatency: '521',
      warmStartLatency: '180',
    },
    {
      funcName: '10minutes',
      numberOfPings: '144',
      numberOfColdStarts: '9',
      coldStartPercentage: '6.25',
      averageLatency: '399',
      coldStartLatency: '609',
      warmStartLatency: '141',
    },
    {
      funcName: '15minutes',
      numberOfPings: '96',
      numberOfColdStarts: '19',
      coldStartPercentage: '19.7',
      averageLatency: '438',
      coldStartLatency: '626',
      warmStartLatency: '189',
    },
    {
      funcName: '30minutes',
      numberOfPings: '48',
      numberOfColdStarts: '42',
      coldStartPercentage: '87.5',
      averageLatency: '650',
      coldStartLatency: '660',
      warmStartLatency: '200',
    },
  ];

  const [data, setData] = useState(myArray);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('./fake_data.txt');
  //       // see response
  //       console.log('I am reponse from fetch fake_data: ', response);
  //       const text = await response.text();
  //       //see response in text format
  //       // console.log('I am response in text format: ', text);
  //       Papa.parse(text, {
  //         header: true,
  //         complete: (result) => {
  //           //see data structure of result
  //           console.log('I am result after papa.parse: ', result.data);
  //           setData(result.data);
  //         },
  //       });
  //       const data = await response.json();
  //       // const data = await text.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error('Failed to load data', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="dashboard-page">
      <h1>This is graph</h1>
      {/* <Graph data={data}/> */}
      {/* <Chart /> */}
      <h1>This is table</h1>
      <FunctionPerformanceTable data={data} />
    </div>
  );
}

export default Dashboard;
