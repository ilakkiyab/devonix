import { useState } from 'react';
import { CreditCard, Shield, Lock, KeyRound, ArrowUpDown } from 'lucide-react';

const CardsPage = () => {
  const [cardSettings, setCardSettings] = useState({
    onlineTransactions: true,
    cardBlocked: false,
    pinSet: true
  });

  const [creditLimitUsed] = useState(30); // Percentage

  const toggleSetting = (setting) => {
    setCardSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <div className="space-y-6">
      {/* Credit Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <span className="text-xs opacity-80">ICICI Bank</span>
        </div>
        <div className="mt-8">
          <CreditCard size={48} className="opacity-80" />
        </div>
        <div className="mt-4">
          <span className="text-lg tracking-wider">•••• •••• •••• 4432</span>
        </div>
        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="text-sm opacity-80">Card Holder</span>
            <div className="text-lg font-semibold">Rajesh Kumar</div>
          </div>
          <div>
            <span className="text-sm opacity-80">Expires</span>
            <div className="text-lg font-semibold">12/26</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Debit Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <span className="text-xs opacity-80">ICICI Bank</span>
        </div>
        <div className="mt-8">
          <CreditCard size={48} className="opacity-80" />
        </div>
        <div className="mt-4">
          <span className="text-lg tracking-wider">•••• •••• •••• 8821</span>
        </div>
        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="text-sm opacity-80">Card Holder</span>
            <div className="text-lg font-semibold">Rajesh Kumar</div>
          </div>
          <div>
            <span className="text-sm opacity-80">Expires</span>
            <div className="text-lg font-semibold">05/25</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Card Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Card Controls</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="text-blue-600 mr-3" size={20} />
              <span className="font-medium">Enable Online Transactions</span>
            </div>
            <button
              onClick={() => toggleSetting('onlineTransactions')}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${cardSettings.onlineTransactions ? 'bg-orange-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${cardSettings.onlineTransactions ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Lock className="text-red-600 mr-3" size={20} />
              <span className="font-medium">Block Card</span>
            </div>
            <button
              onClick={() => toggleSetting('cardBlocked')}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${cardSettings.cardBlocked ? 'bg-orange-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${cardSettings.cardBlocked ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <KeyRound className="text-green-600 mr-3" size={20} />
              <span className="font-medium">Set PIN</span>
            </div>
            <button
              onClick={() => toggleSetting('pinSet')}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${cardSettings.pinSet ? 'bg-orange-500' : 'bg-gray-300'}`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${cardSettings.pinSet ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Credit Limit */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Credit Limit</h3>
        <div className="mb-2 flex justify-between text-sm">
          <span>Used: ₹30,000</span>
          <span>Available: ₹70,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-orange-500 h-2.5 rounded-full"
            style={{ width: `${creditLimitUsed}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Total Limit: ₹1,00,000
        </div>
      </div>
    </div>
  );
};

export default CardsPage;