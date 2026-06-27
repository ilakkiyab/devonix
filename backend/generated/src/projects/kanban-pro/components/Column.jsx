import TaskCard from './TaskCard';
import { useState } from "react";
import { Plus, Trash2 } from 'lucide-react';

export default function Column({ title, tasks, onAddTask, onDeleteTask, onMoveTask, columnId }) {
  const [newTask, setNewTask] = useState('');
  const [assignee, setAssignee] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask, assignee);
      setNewTask('');
      setAssignee('');
    }
  };

  return (
    <div className="w-80 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 shadow-lg transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-300">{title}</h2>

      {columnId === 'todo' && (
        <form onSubmit={handleAddTask} className="mb-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 bg-white/20 dark:bg-gray-700/50 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none transition-colors duration-300"
            />
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Assign to..."
              className="flex-1 bg-white/20 dark:bg-gray-700/50 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border-none outline-none transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-300"
            >
              <Plus size={20} />
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onMoveLeft={() => onMoveTask(task.id, 'left')}
            onMoveRight={() => onMoveTask(task.id, 'right')}
            columnId={columnId}
          />
        ))}
      </div>
    </div>
  );
}