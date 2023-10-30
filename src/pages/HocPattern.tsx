import { TodoHoc } from '@/components';
import React, { useEffect } from 'react';
const HocPattern = () => {
  return (
    <>
      <div className="p-16">
        <h1>patron</h1>
        <TodoHoc />
      </div>
    </>
  );
};

export default HocPattern;
