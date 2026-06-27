import { useState } from 'react';
import { Eye, EyeOff, Download } from 'lucide-react';

const AccountsPage = () => {
  const [showBalance, setShowBalance] = useState({});

  const accounts = [
    {
      id: 1,
      type: 'Savings Account',
      number: 'XXXXXXXX4432',
      balance: '₹1,45,000.00'
    },
    {
      id: 2,
      type: 'Current Account',
      number: 'XXXXXXXX8821',
      balance: '₹2,75,000.00'
    }
  ];

  const toggleBalance = (id) => {
    setShowBalance(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Accounts</h2>

        <div className="space-y-4">
          {accounts.map(account => (
            <div key={account.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{account.type}</h3>
                  <p className="text-gray-600">Account No: {account.number}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleBalance(account.id)}
                    className="flex items-center text-orange-500 hover:text-orange-600"
                  >
                    {showBalance[account.id] ? (
                      <EyeOff className="mr-1" size={18} />
                    ) : (
                      <Eye className="mr-1" size={18} />
                    )}
                    <span>{showBalance[account.id] ? 'Hide Balance' : 'View Balance'}</span>
                  </button>
                  {showBalance[account.id] && (
                    <span className="font-bold text-gray-900">{account.balance}</span>
                  )}
                  <button className="flex items-center text-blue-600 hover:text-blue-700">
                    <Download className="mr-1" size={18} />
                    <span>Statement</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;