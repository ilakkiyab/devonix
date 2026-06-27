import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const [loginMethod, setLoginMethod] = useState('userId');
  const [userId, setUserId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/dashboard/home');
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Hero Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-900 to-blue-600 items-center justify-center">
        <div className="text-white text-center p-8">
          <h1 className="text-4xl font-bold mb-4">ICICI Bank</h1>
          <p className="text-xl">Secure Internet Banking</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`flex-1 py-2 px-4 text-center ${loginMethod === 'userId' ? 'border-b-2 border-orange-500 text-orange-500 font-medium' : 'text-gray-500'}`}
                onClick={() => setLoginMethod('userId')}
              >
                User ID
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center ${loginMethod === 'mobile' ? 'border-b-2 border-orange-500 text-orange-500 font-medium' : 'text-gray-500'}`}
                onClick={() => setLoginMethod('mobile')}
              >
                Mobile Number
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginMethod === 'userId' ? (
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            ) : (
              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <a href="#" className="text-orange-500 hover:underline">Forgot User ID?</a>
                <span className="mx-1">|</span>
                <a href="#" className="text-orange-500 hover:underline">Forgot Password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <p>Never share your OTP/PIN with anyone.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;