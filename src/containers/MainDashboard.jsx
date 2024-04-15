import React, { createContext, useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const AllData = createContext(null);

function MainDashboard() {
  const [data, setData] = useState([]);
  const [pingData, setPingData] = useState([]);
  const [periodicData, setPeriodicData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // api/data provides data for performance table and pings table
        const response = await fetch('/api/data');
        const newData = await response.json();
        setData(newData[0]);
        setPingData(newData[1]);
        //api/period provides data for Chart
        const periodResponse = await fetch('/api/period');
        const periodData = await periodResponse.json();
        setPeriodicData(periodData);
        //api/comps provides data for Overview Panel
        const compResponse = await fetch('/api/comps');
        const compData = await compResponse.json();
        setComparisonData(compData);
        // get range of date (begins from 7 days ago)
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

  console.log('Dashboard dismounted');

  const value = { data, pingData, periodicData, comparisonData, dateRange };

  return (
    <div>
      <AllData.Provider value={value}>
        <Dashboard />
      </AllData.Provider>
    </div>
  );
}

export default MainDashboard;
export { AllData };