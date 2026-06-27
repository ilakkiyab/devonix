import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Storefront from './customer/Storefront';
import ProductPage from './customer/ProductPage';
import Cart from './customer/Cart';
import OrderTracking from './customer/OrderTracking';

const CustomerPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<Storefront />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<OrderTracking />} />
    </Routes>
  );
};

export default CustomerPortal;