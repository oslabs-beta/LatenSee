import React from 'react';
import SideNavBar from './components/SideNavBar';
import Configure from './containers/Configure';
import Dashboard from './containers/Dashboard';
import MainDashboard from './containers/MainDashboard';
import User from './containers/User';
import { Routes, Route } from 'react-router-dom';
import '../src/styles.scss';

const App = () => {
  return (
    <div className="container">
      <SideNavBar />
      <div className="main-content">
        <Routes>
          <Route path="config" element={<Configure />} />
          <Route path="dashboard" element={<MainDashboard />} />
          <Route path="user" element={<User />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
