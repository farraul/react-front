import React from 'react';

const toDoItemHoc = ({ title, complete }) => {
  return (
    <div>
      toDoItemHoc
      <input type="checkbox" checked={complete} />
      {title}
    </div>
  );
};

export default toDoItemHoc;
