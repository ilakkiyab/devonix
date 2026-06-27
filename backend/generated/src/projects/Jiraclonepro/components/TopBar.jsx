import { Search, ChevronDown, User } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-[#0d1117] border border-[#30363d] rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:border-gray-500"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <nav className="ml-6 flex items-center space-x-2 text-gray-400">
          <span className="hover:text-white cursor-pointer">Project</span>
          <ChevronDown size={16} />
        </nav>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <User size={18} className="mr-2" />
          <span className="text-sm mr-2">John Doe</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}