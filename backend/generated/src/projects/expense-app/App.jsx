import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryCard from './components/SummaryCard';

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Expense Tracker</h1>
        <SummaryCard totalSpent={totalSpent} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ExpenseForm addExpense={addExpense} />
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;