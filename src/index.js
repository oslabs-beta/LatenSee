import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { TourProvider } from './components/TourContext';

// import styles from './stylesheets/style.css';

ReactDOM.render(
  <TourProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </TourProvider>,
  document.getElementById('root')
);
