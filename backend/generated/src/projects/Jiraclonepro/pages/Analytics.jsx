import { BarChart, PieChart, LineChart, Users } from 'lucide-react';

export default function Analytics() {
  const stats = [
    { id: 1, title: 'Total Tasks', value: '124', icon: <BarChart size={24} /> },
    { id: 2, title: 'Completed', value: '42', icon: <PieChart size={24} /> },
    { id: 3, title: 'In Progress', value: '38', icon: <LineChart size={24} /> },
    { id: 4, title: 'Team Members', value: '12', icon: <Users size={24} /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-6 hover:border-gray-500 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className="text-gray-400">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}