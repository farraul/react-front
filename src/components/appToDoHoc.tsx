import React from 'react';
import WithSearchHoc from './withSearchHoc';
import TodoListHoc from './todoListHoc';

const appToDoHoc = () => {
  const products = [
    { id: 0, title: 'carne' },
    { id: 1, title: 'leche' },
  ];
  const toDos = [
    { id: 0, title: 'tarea nueva', complete: false },
    { id: 1, title: 'tarea 2', complete: true },
  ];

  const toDoListWithSearch = WithSearchHoc(TodoListHoc, toDos);
  // const productListWithSearch= WithSearchHoc(productList, products)
  return <toDoListWithSearch />;
};

export default appToDoHoc;
