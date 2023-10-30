import { filterItems } from '@/utilities/filterItems';
import React from 'react';
import TodoItemHoc from './TodoItemHoc';

const TodoListHoc = ({ query, dataSet }: { query: any; dataSet: any }) => {
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
