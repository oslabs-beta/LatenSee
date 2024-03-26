import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './component/App.jsx';
import './styles.scss';

const root = createRoot(document.getElementById('contents'));
root.render(
  <div className="App">
    <App />
  </div>
);

export default App;
