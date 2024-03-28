import React from 'react';
import SideNavBar from './components/SideNavBar';
import Configure from './containers/Configure';
import Dashboard from './containers/Dashboard';
import { Routes, Route } from 'react-router-dom';
import '../src/styles.scss';

const App = () => {
  return (
    <div className="container">
      <SideNavBar />
      <div className="main-content">
        <Routes>
          <Route path="config" element={<Configure />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
