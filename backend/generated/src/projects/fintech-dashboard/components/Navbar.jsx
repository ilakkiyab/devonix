import { ShoppingCart, LogOut, Package, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cart, darkMode, setDarkMode }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={darkMode ? 'sticky top-0 z-50 bg-gray-800 shadow-sm' : 'sticky top-0 z-50 bg-white shadow-sm'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/shop" className="flex items-center space-x-2">
              <Package className={darkMode ? 'h-8 w-8 text-indigo-400' : 'h-8 w-8 text-indigo-600'} />
              <span className={darkMode ? 'text-xl font-bold text-white' : 'text-xl font-bold text-gray-900'}>ElectroMart</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/shop"
              className={darkMode ? 'text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'}
            >
              Shop
            </Link>
            <Link
              to="/cart"
              className={darkMode ? 'relative text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'relative text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleDarkMode}
              className={darkMode ? 'text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className={darkMode ? 'text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition-colors' : 'text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;