import React from 'react';

const TodoItemHoc = ({ title, completed }) => {
  return (
    <div>
      <input type="checkbox" checked={completed} className="mr-2" />
      {title}
    </div>
  );
};

export default TodoItemHoc;
