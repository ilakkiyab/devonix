import { useState } from 'react';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState('');

  const add = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    setResult(isNaN(n1) || isNaN(n2) ? 'Invalid input' : n1 + n2);
  };

  const subtract = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    setResult(isNaN(n1) || isNaN(n2) ? 'Invalid input' : n1 - n2);
  };

  const multiply = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    setResult(isNaN(n1) || isNaN(n2) ? 'Invalid input' : n1 * n2);
  };

  const divide = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Invalid input');
    } else if (n2 === 0) {
      setResult('Error: Division by zero');
    } else {
      setResult(n1 / n2);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-80">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold">Calculator</h2>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Number 1"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Number 2"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={add}
          >
            Add
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={subtract}
          >
            Subtract
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={multiply}
          >
            Multiply
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={divide}
          >
            Divide
          </button>
        </div>
        <div className="bg-gray-700 p-3 rounded text-center">
          <p className="text-lg font-semibold">Result: {result}</p>
        </div>
      </div>
    </div>
  );
}