import React from 'react';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import SupplierPage from './pages/SupplierPage';
import ProfilePage from './pages/ProfilePage';
import { Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        {/*<Route path="/" element={<></>} />*/}
        <Route path="/login/:id" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="supplier/:id" element={<SupplierPage />} />
        <Route path="profile/:type/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
