import React from 'react';
import Configure from './containers/Configure';
// import Dashboard from './containers/Dashboard';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      {/* <p>We're inside the App component</p> */}
      <Routes>
        {/* <div> */}
        <Route path="/" element={<Configure />} />
        {/* <Route path="/configure" component={Configure} /> */}
        {/* <Route path="/dashboard" component={Dashboard} />*/}
        {/* </div> */}
      </Routes>
    </div>
  );
};

export default App;
