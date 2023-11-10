import WithSearchHoc from './withSearchHoc';
import TodoListHoc from './todoListHoc';

const ServicesHoc = () => {
  const Services = [
    { id: 0, title: 'servicio 1', completed: true },
    { id: 1, title: 'servicio 2', completed: false },
    { id: 2, title: 'servicio 3', completed: false },
  ];

  const ToDoListWithSearch = WithSearchHoc({ Component: TodoListHoc, dataSet: Services });

  return ToDoListWithSearch;
};

export default ServicesHoc;
