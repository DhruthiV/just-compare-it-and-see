import React from 'react';
import ReactDOM from 'react-dom/client';  
import { BrowserRouter as Router } from 'react-router-dom';
import { SyllabusProvider } from './context/SyllabusContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(
  <SyllabusProvider>
    <Router>  
      <App />
    </Router>
  </SyllabusProvider>
);
