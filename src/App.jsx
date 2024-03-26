import React from 'react';
import Configure from './containers/Configure';
import DashboardContainer from './containers/DashboardContainer';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      {/* <p>We're inside the App component</p> */}
      <Routes>
        <Route path="config" element={<Configure />} />
        <Route path="dashboard" element={<DashboardContainer />} />
      </Routes>
    </div>
  );
};

export default App;
