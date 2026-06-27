import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommissionManager from './admin/CommissionManager';
import VendorVerification from './admin/VendorVerification';
import DisputeResolution from './admin/DisputeResolution';

const AdminCommandCenter = () => {
  return (
    <Routes>
      <Route path="/commissions" element={<CommissionManager />} />
      <Route path="/verification" element={<VendorVerification />} />
      <Route path="/disputes" element={<DisputeResolution />} />
    </Routes>
  );
};

export default AdminCommandCenter;