import { Outlet, useNavigate } from 'react-router-dom';
import { Home, CreditCard, ArrowRightLeft, Shield, LogOut, Bell, User } from 'lucide-react';

const DashboardLayout = ({ userData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col hidden md:flex">
        <div className="p-4 border-b border-blue-800">
          <h1 className="text-xl font-bold">ICICI NetBanking</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate('/dashboard/home')}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <Home className="mr-3" size={18} />
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard/accounts')}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <Shield className="mr-3" size={18} />
                <span>Accounts</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard/cards')}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <CreditCard className="mr-3" size={18} />
                <span>Cards</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard/transactions')}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <ArrowRightLeft className="mr-3" size={18} />
                <span>Transactions</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/dashboard/transfer')}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <ArrowRightLeft className="mr-3" size={18} />
                <span>Transfer</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-2 rounded hover:bg-blue-800"
              >
                <LogOut className="mr-3" size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 w-full bg-blue-900 text-white flex justify-around p-2">
        <button onClick={() => navigate('/dashboard/home')} className="flex flex-col items-center">
          <Home size={20} />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => navigate('/dashboard/accounts')} className="flex flex-col items-center">
          <Shield size={20} />
          <span className="text-xs">Accounts</span>
        </button>
        <button onClick={() => navigate('/dashboard/cards')} className="flex flex-col items-center">
          <CreditCard size={20} />
          <span className="text-xs">Cards</span>
        </button>
        <button onClick={() => navigate('/dashboard/transfer')} className="flex flex-col items-center">
          <ArrowRightLeft size={20} />
          <span className="text-xs">Transfer</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bell className="text-gray-600" size={20} />
            </div>
            <div className="flex items-center">
              <User className="text-gray-600 mr-2" size={20} />
              <span className="text-sm">Welcome, {userData.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;