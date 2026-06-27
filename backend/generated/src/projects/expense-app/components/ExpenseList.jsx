import { DollarSign } from 'lucide-react';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-400">No expenses added yet.</p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-medium">{expense.title}</h3>
                <p className="text-sm text-gray-400">{expense.category}</p>
              </div>
              <div className="flex items-center font-medium">
                <DollarSign size={16} className="mr-1" />
                {expense.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;