import { DollarSign, TrendingUp } from 'lucide-react';

const SummaryCard = ({ totalSpent }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">Total Spent</p>
          <p className="text-2xl font-bold flex items-center">
            <DollarSign size={20} className="mr-1" />
            {totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-500 p-3 rounded-full">
          <TrendingUp size={24} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;