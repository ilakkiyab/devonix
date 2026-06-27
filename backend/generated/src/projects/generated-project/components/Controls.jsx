const Controls = ({ addRuns, addWicket }) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      <button
        onClick={() => addRuns(1)}
        className="bg-white text-green-600 font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-lg"
      >
        +1 Run
      </button>
      <button
        onClick={() => addRuns(4)}
        className="bg-white text-green-600 font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-lg"
      >
        +4 Runs
      </button>
      <button
        onClick={() => addRuns(6)}
        className="bg-white text-green-600 font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-lg"
      >
        +6 Runs
      </button>
      <button
        onClick={addWicket}
        className="bg-red-500 text-white font-semibold py-4 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-lg"
      >
        Wicket OUT!
      </button>
    </div>
  );
};

export default Controls;