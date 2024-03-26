import React, { useState } from 'react';
import DashboardContainer from './DashboardContainer';
// import GraphContainer from './GraphContainer';

const App = () => {
  return (
    <div>
      <div className="graph-container">
        <h1>This is graph container</h1>
        {/* <GraphContrainer /> */}
      </div>
      <div className="dashboard-container">
        <h1>THis is dashboard container</h1>
        <DashboardContainer />
      </div>
    </div>
  );
};

export default App;
