import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import ConfigurePage from './ConfigurePage'; // Assuming there's a route/component for configuration

function MainDashboard() {
  const [data, setData] = useState([]);
  const [pingData, setPingData] = useState([]);
  const [periodicData, setPeriodicData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    // Fetch all necessary data here
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const newData = await response.json();
        setData(newData[0]);
        setPingData(newData[1]);

        const periodResponse = await fetch('/api/period');
        const periodData = await periodResponse.json();
        setPeriodicData(periodData);

        const compResponse = await fetch('/api/comps');
        const compData = await compResponse.json();
        setComparisonData(compData);

        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);
        const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
        const formattedDateRange = `${formatDate(startDate)} - ${formatDate(
          endDate
        )}`;
        setDateRange(formattedDateRange);
      } catch (error) {
        console.log('Failed to load data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Dashboard
        data={data}
        pingData={pingData}
        periodicData={periodicData}
        comparisonData={comparisonData}
        dateRange={dateRange}
      />
      {/* Include other components or routing logic here */}
    </div>
  );
}

export default MainDashboard;
