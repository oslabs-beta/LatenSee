import React, { useState, useEffect } from 'react';
import FunctionPerformanceTable from '../components/FunctionPerformanceTable';
import Papa from 'papaparse';

function Dashboard() {
  const myArray = [
    {
      funcName: 'function1',
      firstRun: 'true',
      timestamp: '2024-03-20 04:35:00+00',
      serverDiff: '988',
    },
    {
      funcName: 'function2',
      firstRun: 'false',
      timestamp: '2024-03-20 04:35:00+00',
      serverDiff: '188',
    },
    {
      funcName: 'function3',
      firstRun: 'true',
      timestamp: '2024-03-20 04:35:00+00',
      serverDiff: '38',
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
    <div>
      <h1>This is graph</h1>
      {/* <Graph data={data}/> */}
      <h1>This is table</h1>
      <FunctionPerformanceTable data={data} />
    </div>
  );
}

export default Dashboard;
