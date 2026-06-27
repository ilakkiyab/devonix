import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cart, setCart, darkMode }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    cardNumber: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully! Redirecting to shop...');
    setCart([]);
    navigate('/shop');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className={darkMode ? 'text-3xl font-bold text-white mb-8' : 'text-3xl font-bold text-gray-900 mb-8'}>Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-6' : 'bg-white rounded-xl shadow-lg p-6'}>
          <h2 className={darkMode ? 'text-xl font-semibold text-white mb-6' : 'text-xl font-semibold text-gray-900 mb-6'}>Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className={darkMode ? 'block text-sm font-medium text-gray-300 mb-1' : 'block text-sm font-medium text-gray-700 mb-1'}>Full Name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={darkMode ? 'w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white' : 'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'}
              />
            </div>
            <div>
              <label htmlFor="address" className={darkMode ? 'block text-sm font-medium text-gray-300 mb-1' : 'block text-sm font-medium text-gray-700 mb-1'}>Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className={darkMode ? 'w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white' : 'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'}
              />
            </div>
            <div>
              <label htmlFor="cardNumber" className={darkMode ? 'block text-sm font-medium text-gray-300 mb-1' : 'block text-sm font-medium text-gray-700 mb-1'}>Card Number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className={darkMode ? 'w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white' : 'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Place Order
            </button>
          </form>
        </div>
        <div className={darkMode ? 'bg-gray-800 rounded-xl shadow-lg p-6' : 'bg-white rounded-xl shadow-lg p-6'}>
          <h2 className={darkMode ? 'text-xl font-semibold text-white mb-6' : 'text-xl font-semibold text-gray-900 mb-6'}>Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <h3 className={darkMode ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>{item.name}</h3>
                  <p className={darkMode ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>${item.price} x {item.quantity}</p>
                </div>
                <p className={darkMode ? 'font-semibold text-white' : 'font-semibold text-gray-900'}>${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className={darkMode ? 'border-t border-gray-700 mt-6 pt-6' : 'border-t border-gray-200 mt-6 pt-6'}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={darkMode ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>Total</h3>
              <p className={darkMode ? 'text-2xl font-bold text-indigo-400' : 'text-2xl font-bold text-indigo-600'}>${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;