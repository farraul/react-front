import { filterItems } from 'src/utilities/filterItems';
import React from 'react';
import ToDoItem from './ToDoItem';

type dataSet = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList = ({ query, dataSet }: { query: string; dataSet: dataSet[] }) => {
  const items = filterItems(query, dataSet);
  return (
    <div>
      {items.map((product, index) => (
        <ToDoItem key={index} title={product.title} completed={product.completed} />
      ))}
    </div>
  );
};

export default TodoList;
