import React from 'react';
import CatalogPage from './pages/CatalogPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
      </Routes>
    </div>
  );
}

export default App;
