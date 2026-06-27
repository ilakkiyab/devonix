import { ChevronLeft, ChevronRight, Trash2, User } from 'lucide-react';

export default function TaskCard({ task, onDelete, onMoveLeft, onMoveRight, columnId }) {
  return (
    <div className="bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm rounded-lg p-3 shadow-md flex flex-col gap-2 transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-800 dark:text-gray-200 break-words transition-colors duration-300">{task.content}</p>
          {task.assignee && (
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              <User size={14} className="mr-1" />
              <span>{task.assignee}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-500 hover:text-red-500 transition-colors ml-2"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex gap-2 mt-2">
        {columnId !== 'todo' && (
          <button
            onClick={onMoveLeft}
            className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 py-1 px-2 rounded text-sm transition-colors duration-300 flex items-center justify-center gap-1"
          >
            <ChevronLeft size={16} /> Move Left
          </button>
        )}

        {columnId !== 'done' && (
          <button
            onClick={onMoveRight}
            className="flex-1 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 py-1 px-2 rounded text-sm transition-colors duration-300 flex items-center justify-center gap-1"
          >
            Move Right <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}