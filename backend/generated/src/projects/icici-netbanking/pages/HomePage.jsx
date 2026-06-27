import { CreditCard, ArrowUpDown, Receipt, FileText } from 'lucide-react';

const HomePage = ({ userData }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800">Good Morning, {userData.name}</h2>
        <p className="text-gray-600 mt-1">Your last login was on: {new Date().toLocaleString()}</p>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Savings Account</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹{userData.balance}</p>
            </div>
            <CreditCard className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Fixed Deposits</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹50,000.00</p>
            </div>
            <ArrowUpDown className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Loans</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹2,50,000.00</p>
            </div>
            <Receipt className="text-red-600" size={32} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <ArrowUpDown className="text-blue-600 mb-2" size={24} />
            <span className="text-sm font-medium">Send Money</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <FileText className="text-green-600 mb-2" size={24} />
            <span className="text-sm font-medium">Pay Bills</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <CreditCard className="text-orange-600 mb-2" size={24} />
            <span className="text-sm font-medium">Recharge</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Receipt className="text-purple-600 mb-2" size={24} />
            <span className="text-sm font-medium">Statement</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;