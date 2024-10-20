import { useSelector } from "react-redux";
import TaskItem from "./TodoItem"; // Renamed import for consistency

const TaskList = () => {
  const filteredTasks = useSelector((state) => {
    const tasks = state.todos; // Keeping 'todos' as tasks for consistency
    const filter = state.filter;
    const searchTerm = state.searchTerm.toLowerCase(); // Convert search term to lowercase for case-insensitive search

    return tasks.filter((task) => {
      const matchesFilter = (filter === 'COMPLETED' && task.completed) ||
        (filter === 'INCOMPLETE' && !task.completed) ||
        filter === 'ALL';

      const matchesSearch = task.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  console.log('Filtered Tasks:', filteredTasks); // Renamed for consistency

  return (
    <ul>
      <li className="my-2 text-sm italic text-gray-400">All Your Notes Here...</li>
      {filteredTasks.map((task, key) => (
        <TaskItem index={key} todo={task}/>
      ))}
    </ul>
  );
};

export default TaskList;
