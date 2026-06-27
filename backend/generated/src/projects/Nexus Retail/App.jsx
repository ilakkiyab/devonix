import React, { useContext, useState } from "react";
import { CartContext } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";
import { ShoppingCart, Moon, Sun, LogOut, Home } from "lucide-react";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import CheckoutPage from "./components/checkout/Checkout";
import UserDashboard from "./components/UserDashboard";
import OrderSuccessPage from "./components/OrderSuccessPage";

export default function App() {
  const { user, logout, darkMode, setDarkMode } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [currentPage, setCurrentPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);

  if (!user) {
    return currentPage === "register" ? (
      <div>
        <RegisterPage />
        <button
          onClick={() => setCurrentPage("login")}
          className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    ) : (
      <div>
        <LoginPage />
        <button
          onClick={() => setCurrentPage("register")}
          className="fixed bottom-4 left-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Account
        </button>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Navigation */}
      <nav className="bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 
          className="text-2xl font-bold text-blue-500 cursor-pointer hover:text-blue-400 transition" 
          onClick={() => setCurrentPage("home")}
        >
          🛍️ Nexus Retail
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="p-2 hover:bg-gray-800 rounded transition text-gray-300 hover:text-white"
            title="Dashboard"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-gray-800 rounded transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-400" />}
          </button>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative p-2 hover:bg-gray-800 rounded transition"
          >
            <ShoppingCart className="w-5 h-5 text-gray-300" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              logout();
              setCurrentPage("login");
            }}
            className="p-2 hover:bg-gray-800 rounded transition flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Content */}
      <main className={darkMode ? "bg-gray-950 text-white" : "bg-black text-white"}>
        {currentPage === "home" && (
          <>
            <HeroSection />
            <ProductGrid />
          </>
        )}
        {currentPage === "dashboard" && <UserDashboard />}
        {currentPage === "checkout" && <CheckoutPage setCurrentPage={setCurrentPage} />}
        {currentPage === "order-success" && <OrderSuccessPage setCurrentPage={setCurrentPage} />}
      </main>
    </div>
  );
}
