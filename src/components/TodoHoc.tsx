import WithSearchHoc from './WithSearchHoc';
import TodoListHoc from './TodoListHoc';

const TodoHoc = () => {
  const toDos = [
    { id: 0, title: 'tarea 1', completed: false },
    { id: 1, title: 'tarea 2', completed: true },
    { id: 2, title: 'tarea 3', completed: true },
  ];

  const ToDoListWithSearch = WithSearchHoc(TodoListHoc, toDos);

  // const products = [
  //   { id: 0, title: 'carne' },
  //   { id: 1, title: 'leche' },
  // ];
  // const productListWithSearch= WithSearchHoc(productList, products)

  return ToDoListWithSearch;
};

export default TodoHoc;
