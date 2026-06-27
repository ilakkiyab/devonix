import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerPortal from './components/CustomerPortal';
import VendorDashboard from './components/VendorDashboard';
import AdminCommandCenter from './components/AdminCommandCenter';
import AuthProvider from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/customer/*" element={<CustomerPortal />} />
          <Route path="/vendor/*" element={<VendorDashboard />} />
          <Route path="/admin/*" element={<AdminCommandCenter />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;