import TodoItem from './TodoItem';

export default function TodoList({ tasks }) {
  return (
    <div className="mt-4">
      {tasks.map((task, index) => (
        <TodoItem key={index} task={task} />
      ))}
    </div>
  );
}