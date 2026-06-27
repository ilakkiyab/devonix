import { LayoutDashboard, List, BarChart2, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navItems = [
    { to: '/board', icon: <LayoutDashboard size={18} />, label: 'Board' },
    { to: '/table', icon: <List size={18} />, label: 'List' },
    { to: '/analytics', icon: <BarChart2 size={18} />, label: 'Analytics' },
    { to: '/settings', icon: <Settings size={18} />, label: 'Settings' }
  ];

  return (
    <div className={`bg-[#161b22] border-r border-[#30363d] flex flex-col h-full ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-200`}>
      <div className="p-4 flex justify-between items-center border-b border-[#30363d]">
        {!isCollapsed && <h1 className="text-xl font-bold">JiraClone</h1>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 hover:bg-[#0d1117] rounded">
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      <nav className="flex-1 p-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `
              flex items-center p-3 rounded mb-1 hover:bg-[#0d1117]
              ${isActive ? 'bg-[#0d1117] border border-gray-500' : ''}
            `}
          >
            <span className="mr-3">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}