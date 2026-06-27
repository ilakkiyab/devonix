import { useState } from 'react';
import { Calendar, ArrowUpDown, Search } from 'lucide-react';

const TransactionsPage = () => {
  const [dateRange, setDateRange] = useState('lastMonth');
  const [transactionType, setTransactionType] = useState('all');

  const transactions = [
    { id: 1, date: '2023-11-15', description: 'Amazon India', refNo: 'AMZN123456', amount: '-₹2,499.00', type: 'debit', balance: '₹1,42,501.00' },
    { id: 2, date: '2023-11-14', description: 'Salary Credit', refNo: 'SAL112233', amount: '+₹50,000.00', type: 'credit', balance: '₹1,45,000.00' },
    { id: 3, date: '2023-11-13', description: 'UPI Transfer', refNo: 'UPI789012', amount: '-₹1,500.00', type: 'debit', balance: '₹95,000.00' },
    { id: 4, date: '2023-11-12', description: 'Electricity Bill', refNo: 'BIL456789', amount: '-₹3,200.00', type: 'debit', balance: '₹96,500.00' },
    { id: 5, date: '2023-11-11', description: 'Interest Credit', refNo: 'INT345678', amount: '+₹1,200.00', type: 'credit', balance: '₹99,700.00' },
  ];

  const filteredTransactions = transactions.filter(txn => {
    if (transactionType === 'all') return true;
    return txn.type === transactionType;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="lastMonth">Last Month</option>
              <option value="last3Months">Last 3 Months</option>
              <option value="last6Months">Last 6 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Transactions</option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((txn) => (
              <tr key={txn.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{txn.refNo}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${txn.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                  {txn.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{txn.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsPage;