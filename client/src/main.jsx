// Import necessary modules from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component and the associated styles
import App from './App.jsx';
import './index.css';

// Use ReactDOM.createRoot to create a root for rendering and attach it to the 'root' element in the HTML
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the App component with React.StrictMode for additional development mode checks
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
