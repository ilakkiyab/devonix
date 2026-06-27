import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import CardsPage from './pages/CardsPage';
import TransactionsPage from './pages/TransactionsPage';
import TransferPage from './pages/TransferPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "Rajesh Kumar",
    balance: "₹1,45,000.00"
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard/home" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard/*"
          element={isLoggedIn ? <DashboardLayout userData={userData} /> : <Navigate to="/" />}
        >
          <Route path="home" element={<HomePage userData={userData} />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="cards" element={<CardsPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transfer" element={<TransferPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;