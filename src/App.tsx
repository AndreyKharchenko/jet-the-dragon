import React from 'react';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        {/*<Route path="/" element={<CatalogPage />} />*/}
        <Route path="/" element={<></>} />
        <Route path="/login/:id" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
