import { useState } from 'react';
import Column from '../components/Column';
import { Moon, Sun } from 'lucide-react';

export default function Board({ darkMode, setDarkMode }) {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, content: 'Build the UI components', assignee: 'John' },
      { id: 2, content: 'Set up the project structure', assignee: 'Alice' }
    ],
    inProgress: [
      { id: 3, content: 'Implement drag and drop simulation', assignee: 'Bob' }
    ],
    done: [
      { id: 4, content: 'Create the initial design', assignee: 'Charlie' }
    ]
  });

  const addTask = (content, assignee) => {
    const newTask = {
      id: Date.now(),
      content,
      assignee: assignee || 'Unassigned'
    };
    setTasks({ ...tasks, todo: [...tasks.todo, newTask] });
  };

  const deleteTask = (taskId, columnId) => {
    setTasks({
      ...tasks,
      [columnId]: tasks[columnId].filter(task => task.id !== taskId)
    });
  };

  const moveTask = (taskId, direction, currentColumnId) => {
    const columns = ['todo', 'inProgress', 'done'];
    const currentIndex = columns.indexOf(currentColumnId);

    if (direction === 'left' && currentIndex > 0) {
      const newColumnId = columns[currentIndex - 1];
      moveTaskBetweenColumns(taskId, currentColumnId, newColumnId);
    }

    if (direction === 'right' && currentIndex < columns.length - 1) {
      const newColumnId = columns[currentIndex + 1];
      moveTaskBetweenColumns(taskId, currentColumnId, newColumnId);
    }
  };

  const moveTaskBetweenColumns = (taskId, fromColumn, toColumn) => {
    const taskToMove = tasks[fromColumn].find(task => task.id === taskId);
    if (!taskToMove) return;

    setTasks({
      ...tasks,
      [fromColumn]: tasks[fromColumn].filter(task => task.id !== taskId),
      [toColumn]: [...tasks[toColumn], taskToMove]
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Task Manager</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-2 rounded-full transition-colors duration-300"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-800" />}
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        <Column
          title="To Do"
          tasks={tasks.todo}
          onAddTask={addTask}
          onDeleteTask={(taskId) => deleteTask(taskId, 'todo')}
          onMoveTask={(taskId, direction) => moveTask(taskId, direction, 'todo')}
          columnId="todo"
        />

        <Column
          title="In Progress"
          tasks={tasks.inProgress}
          onDeleteTask={(taskId) => deleteTask(taskId, 'inProgress')}
          onMoveTask={(taskId, direction) => moveTask(taskId, direction, 'inProgress')}
          columnId="inProgress"
        />

        <Column
          title="Done"
          tasks={tasks.done}
          onDeleteTask={(taskId) => deleteTask(taskId, 'done')}
          onMoveTask={(taskId, direction) => moveTask(taskId, direction, 'done')}
          columnId="done"
        />
      </div>
    </div>
  );
}