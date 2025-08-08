import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/res';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* These divs create the animated background */}
      <div className="background-ring ring1"></div>
      <div className="background-ring ring2"></div>
      <div className="background-ring ring3"></div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;