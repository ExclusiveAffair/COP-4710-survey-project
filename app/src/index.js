import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "react-date-picker/dist/DatePicker.css"
import UserContextProvider from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
