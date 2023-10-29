import { filterItems } from '@/utilities/filterItems';
import React from 'react';

const TodoListHoc = ({ query, dataSet }) => {
  const items = filterItems(query, dataSet);
  return (
    <ul>
      <li>
        Primera tarea
        <button>delete</button>
        <button>edit</button>
      </li>
      <li>
        Segunda tarea
        <button>delete</button>
        <button>edit</button>
      </li>
      <li>
        Tercera tarea
        <button>delete</button>
        <button>edit</button>
      </li>
    </ul>
  );
};

export default TodoListHoc;
