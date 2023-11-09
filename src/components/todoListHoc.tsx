import { filterItems } from '@/utilities/filterItems';
import React from 'react';
import TodoItemHoc from './TodoItemHoc';

type dataSet = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoListHoc = ({ query, dataSet }: { query: string; dataSet: dataSet[] }) => {
  const items = filterItems(query, dataSet);
  return (
    <div>
      {items.map((product) => (
        <TodoItemHoc title={product.title} completed={product.completed} />
      ))}
    </div>
  );
};

export default TodoListHoc;
