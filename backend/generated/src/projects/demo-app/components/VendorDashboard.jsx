import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InventoryManagement from './vendor/InventoryManagement';
import SalesAnalytics from './vendor/SalesAnalytics';
import PricingManager from './vendor/PricingManager';

const VendorDashboard = () => {
  return (
    <Routes>
      <Route path="/inventory" element={<InventoryManagement />} />
      <Route path="/analytics" element={<SalesAnalytics />} />
      <Route path="/pricing" element={<PricingManager />} />
    </Routes>
  );
};

export default VendorDashboard;