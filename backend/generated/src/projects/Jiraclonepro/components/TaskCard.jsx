import { AlertTriangle, Flag, User } from 'lucide-react';

export default function TaskCard({ task }) {
  const getPriorityColor = (priority) => {
    const colors = {
      Critical: 'text-red-500',
      High: 'text-orange-500',
      Medium: 'text-yellow-500',
      Low: 'text-green-500'
    };
    return colors[priority] || 'text-gray-400';
  };

  return (
    <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 hover:border-gray-500 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-400">{task.projectId}</span>
        <AlertTriangle size={16} className={getPriorityColor(task.priority)} />
      </div>
      <h3 className="font-semibold mb-2">{task.title}</h3>
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <User size={16} className="mr-2 text-gray-400" />
          <span className="text-xs text-gray-400">{task.assignee}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${task.status === 'Done' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'}`}>
          {task.status}
        </span>
      </div>
    </div>
  );
}