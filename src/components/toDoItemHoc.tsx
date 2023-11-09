import React from 'react';

const TodoItemHoc = ({ title, completed }: { title: string; completed: boolean }) => {
  return (
    <div>
      <input type="checkbox" defaultChecked={completed} className="mr-2" />
      {title}
    </div>
  );
};

export default TodoItemHoc;
