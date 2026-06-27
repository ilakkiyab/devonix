export default function Controls({ addRuns, addWicket }) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <button
        onClick={() => addRuns(1)}
        className="bg-white text-green-600 font-bold py-4 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-lg"
      >
        +1 Run
      </button>
      <button
        onClick={() => addRuns(4)}
        className="bg-white text-green-600 font-bold py-4 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-lg"
      >
        +4 Runs
      </button>
      <button
        onClick={() => addRuns(6)}
        className="bg-white text-green-600 font-bold py-4 px-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors text-lg"
      >
        +6 Runs
      </button>
      <button
        onClick={addWicket}
        className="bg-red-500 text-white font-bold py-4 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors text-lg"
      >
        Wicket OUT!
      </button>
    </div>
  );
}