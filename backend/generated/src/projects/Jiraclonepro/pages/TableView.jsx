import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function TableView({ tasks }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      Critical: 'bg-red-500',
      High: 'bg-orange-500',
      Medium: 'bg-yellow-500',
      Low: 'bg-green-500'
    };
    return <span className={`px-2 py-1 rounded text-xs ${colors[priority]}`}>{priority}</span>;
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#0d1117] border-b border-[#30363d]">
          <tr>
            <th className="p-3 cursor-pointer" onClick={() => requestSort('projectId')}>Task ID {sortConfig.key === 'projectId' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</th>
            <th className="p-3 cursor-pointer" onClick={() => requestSort('title')}>Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</th>
            <th className="p-3 cursor-pointer" onClick={() => requestSort('priority')}>Priority {sortConfig.key === 'priority' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</th>
            <th className="p-3 cursor-pointer" onClick={() => requestSort('assignee')}>Assignee {sortConfig.key === 'assignee' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</th>
            <th className="p-3 cursor-pointer" onClick={() => requestSort('status')}>Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <tr key={task.id} className="border-b border-[#30363d] hover:bg-[#161b22]">
              <td className="p-3">{task.projectId}</td>
              <td className="p-3">{task.title}</td>
              <td className="p-3">{getPriorityBadge(task.priority)}</td>
              <td className="p-3">{task.assignee}</td>
              <td className="p-3">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}