import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className={darkMode ? "min-h-screen bg-gray-900" : "min-h-screen bg-gray-50"}>
        <Routes>
          <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated} darkMode={darkMode} />} />
          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <Navbar cart={cart} darkMode={darkMode} setDarkMode={setDarkMode} />
                <ShopPage cart={cart} setCart={setCart} darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Navbar cart={cart} darkMode={darkMode} setDarkMode={setDarkMode} />
                <CartPage cart={cart} setCart={setCart} darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Navbar cart={cart} darkMode={darkMode} setDarkMode={setDarkMode} />
                <CheckoutPage cart={cart} setCart={setCart} darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;