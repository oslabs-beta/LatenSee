import React, { useState, useEffect } from 'react';
import Table from './Table';

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
      <Table data={data} />
    </div>
  );
}

export default Dashboard;
