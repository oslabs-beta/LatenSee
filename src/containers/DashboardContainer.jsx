import React, { useState, useEffect } from 'react';
import Table from '../components/Table';

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.txt');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>This is graph</h1>
      {/* <Graph data={data}/> */}
      <h1>This is table</h1>
      <Table data={data} />
    </div>
  );
}

export default Dashboard;
