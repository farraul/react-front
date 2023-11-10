import TodoList from './TodoList';
import WithSearch from './WithSearch';

const Tasks = () => {
  const tasks = [
    { id: 0, title: 'tarea 1', completed: false },
    { id: 1, title: 'tarea 2', completed: true },
    { id: 2, title: 'tarea 3', completed: true },
  ];

  const ToDoListWithSearch = WithSearch({ Component: TodoList, dataSet: tasks });

  return ToDoListWithSearch;
};

export default Tasks;
