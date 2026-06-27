import { Activity } from 'lucide-react';

const ScoreBoard = ({ runs, wickets, overs }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 w-full max-w-md">
      <div className="flex items-center justify-center mb-4">
        <Activity className="text-green-600 mr-2" size={24} />
        <h2 className="text-2xl font-semibold text-gray-800">Scoreboard</h2>
      </div>
      <div className="text-center">
        <p className="text-5xl font-bold text-gray-900 mb-2">{runs} / {wickets}</p>
        <p className="text-xl text-gray-600">Overs: {overs}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;