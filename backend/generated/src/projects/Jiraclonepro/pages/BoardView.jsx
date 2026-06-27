import TaskCard from '../components/TaskCard';

export default function BoardView({ tasks }) {
  const columns = [
    { id: 'backlog', title: 'Backlog', tasks: tasks.filter(task => task.status === 'Backlog') },
    { id: 'todo', title: 'To Do', tasks: tasks.filter(task => task.status === 'To Do') },
    { id: 'inprogress', title: 'In Progress', tasks: tasks.filter(task => task.status === 'In Progress') },
    { id: 'done', title: 'Done', tasks: tasks.filter(task => task.status === 'Done') }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
      {columns.map(column => (
        <div key={column.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-4 h-full flex flex-col">
          <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
          <div className="flex-1 overflow-y-auto space-y-3">
            {column.tasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}