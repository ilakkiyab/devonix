import { useState } from 'react';
import ScoreBoard from './components/ScoreBoard';
import Controls from './components/Controls';
import { Trophy } from 'lucide-react';

function App() {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);

  const addRuns = (value) => {
    setRuns(runs + value);
    setBalls(balls + 1);
  };

  const addWicket = () => {
    setWickets(wickets + 1);
    setBalls(balls + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <Trophy className="mx-auto mb-4 text-yellow-400" size={64} />
        <h1 className="text-4xl font-bold text-white">T20 Score Tracker</h1>
      </div>
      <ScoreBoard runs={runs} wickets={wickets} balls={balls} />
      <Controls addRuns={addRuns} addWicket={addWicket} />
    </div>
  );
}

export default App;