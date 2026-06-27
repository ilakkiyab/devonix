export default function TodoItem({ task }) {
  return (
    <div className="flex items-center p-2 border-b border-gray-200">
      <input type="checkbox" className="mr-2" />
      <span>{task}</span>
    </div>
  );
}