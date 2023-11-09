import WithSearchHoc from './WithSearchHoc';
import TodoListHoc from './TodoListHoc';

const TasksHoc = () => {
  const tasks = [
    { id: 0, title: 'tarea 1', completed: false },
    { id: 1, title: 'tarea 2', completed: true },
    { id: 2, title: 'tarea 3', completed: true },
  ];

  const ToDoListWithSearch = WithSearchHoc({ Component: TodoListHoc, dataSet: tasks });

  return ToDoListWithSearch;
};

export default TasksHoc;
