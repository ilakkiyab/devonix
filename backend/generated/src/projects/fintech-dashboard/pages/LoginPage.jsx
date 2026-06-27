import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    navigate('/shop');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="h-full flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to ElectroMart</h1>
            <p className="text-xl">Your one-stop shop for premium electronics</p>
          </div>
        </div>
      </div>
      <div className={darkMode ? 'w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900' : 'w-full lg:w-1/2 flex items-center justify-center p-8 bg-white'}>
        <div className="w-full max-w-md">
          <div className={darkMode ? 'bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6' : 'bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6'}>
            <p className={darkMode ? 'text-sm text-indigo-400' : 'text-sm text-indigo-800'}>Demo Credentials - Email: user@demo.com | Password: password123</p>
          </div>
          <h2 className={darkMode ? 'text-3xl font-bold text-white mb-8 text-center' : 'text-3xl font-bold text-gray-900 mb-8 text-center'}>Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={darkMode ? 'block text-sm font-medium text-gray-300 mb-1' : 'block text-sm font-medium text-gray-700 mb-1'}>Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={darkMode ? 'w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white' : 'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'}
              />
            </div>
            <div>
              <label htmlFor="password" className={darkMode ? 'block text-sm font-medium text-gray-300 mb-1' : 'block text-sm font-medium text-gray-700 mb-1'}>Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={darkMode ? 'w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-700 text-white' : 'w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;