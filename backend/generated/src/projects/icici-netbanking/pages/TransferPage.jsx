import { useState } from 'react';
import { ArrowRightLeft, User, Bank, CreditCard, Shield, AlertCircle } from 'lucide-react';

const TransferPage = () => {
  const [transferType, setTransferType] = useState('ownAccount');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [remark, setRemark] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setTransferSuccess(true);
      // Reset form
      setAmount('');
      setRecipient('');
      setAccountNumber('');
      setIfscCode('');
      setRemark('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Fund Transfer</h2>

        {transferSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <AlertCircle className="text-green-500 mr-3" size={20} />
            <span className="text-green-700">Transfer successful! Transaction completed.</span>
          </div>
        )}

        <div className="mb-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`flex-1 py-2 px-4 text-center ${transferType === 'ownAccount' ? 'border-b-2 border-orange-500 text-orange-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setTransferType('ownAccount')}
            >
              Own Account
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${transferType === 'otherBank' ? 'border-b-2 border-orange-500 text-orange-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setTransferType('otherBank')}
            >
              Other Bank
            </button>
            <button
              className={`flex-1 py-2 px-4 text-center ${transferType === 'beneficiary' ? 'border-b-2 border-orange-500 text-orange-500 font-medium' : 'text-gray-500'}`}
              onClick={() => setTransferType('beneficiary')}
            >
              Beneficiary
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <div className="relative">
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                min="1"
              />
            </div>
          </div>

          {transferType === 'ownAccount' && (
            <div>
              <label htmlFor="recipientAccount" className="block text-sm font-medium text-gray-700 mb-1">
                Select Account
              </label>
              <select
                id="recipientAccount"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select account</option>
                <option value="savings">Savings Account (XXXXXXXX4432)</option>
                <option value="current">Current Account (XXXXXXXX8821)</option>
              </select>
            </div>
          )}

          {transferType === 'otherBank' && (
            <>
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <input
                  id="accountNumber"
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  pattern="[0-9]{9,18}"
                />
              </div>

              <div>
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code
                </label>
                <input
                  id="ifscCode"
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  pattern="[A-Z]{4}0[A-Z0-9]{6}"
                />
              </div>

              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient Name
                </label>
                <input
                  id="recipientName"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </>
          )}

          {transferType === 'beneficiary' && (
            <div>
              <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700 mb-1">
                Select Beneficiary
              </label>
              <select
                id="beneficiary"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select beneficiary</option>
                <option value="john">John Doe (ICICI0001234)</option>
                <option value="jane">Jane Smith (SBIN0005678)</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
              Remark (Optional)
            </label>
            <input
              id="remark"
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              maxLength="50"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Transfer Summary</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">₹{amount || '0.00'}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Transfer Type:</span>
              <span className="font-medium capitalize">{transferType.replace('otherBank', 'NEFT/RTGS')}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Processing...' : 'Transfer Funds'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Transfer Options</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <ArrowRightLeft className="text-blue-600 mb-2" size={24} />
            <span className="text-sm font-medium">NEFT</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Bank className="text-green-600 mb-2" size={24} />
            <span className="text-sm font-medium">RTGS</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <User className="text-purple-600 mb-2" size={24} />
            <span className="text-sm font-medium">IMPS</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <CreditCard className="text-orange-600 mb-2" size={24} />
            <span className="text-sm font-medium">UPI</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transfer Limits</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="text-blue-600 mr-2" size={18} />
              <span className="text-sm">Daily Limit</span>
            </div>
            <span className="font-medium">₹1,00,000</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="text-green-600 mr-2" size={18} />
              <span className="text-sm">Per Transaction</span>
            </div>
            <span className="font-medium">₹50,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferPage;