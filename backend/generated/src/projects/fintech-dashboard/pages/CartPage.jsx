import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';

const CartPage = ({ cart, setCart, darkMode }) => {
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className={darkMode ? 'text-3xl font-bold text-white mb-8' : 'text-3xl font-bold text-gray-900 mb-8'}>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className={darkMode ? 'mx-auto h-12 w-12 text-gray-400 mb-4' : 'mx-auto h-12 w-12 text-gray-400 mb-4'} />
          <h2 className={darkMode ? 'text-xl font-semibold text-white mb-2' : 'text-xl font-semibold text-gray-900 mb-2'}>Your cart is lonely</h2>
          <p className={darkMode ? 'text-gray-300 mb-6' : 'text-gray-600 mb-6'}>Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg overflow-hidden' : 'bg-white rounded-xl shadow-lg overflow-hidden'}>
          <ul className={darkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}>
            {cart.map((item) => (
              <li key={item.id} className={darkMode ? 'flex items-center justify-between p-6' : 'flex items-center justify-between p-6'}>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className={darkMode ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>{item.name}</h3>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className={darkMode ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>${item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={darkMode ? 'bg-gray-700 p-6' : 'bg-gray-50 p-6'}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={darkMode ? 'text-xl font-semibold text-white' : 'text-xl font-semibold text-gray-900'}>Total</h3>
              <p className={darkMode ? 'text-2xl font-bold text-indigo-400' : 'text-2xl font-bold text-indigo-600'}>${totalPrice}</p>
            </div>
            <Link
              to="/checkout"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;