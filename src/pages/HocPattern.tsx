import { ServicesHoc, TasksHoc } from '@/components';
import React, { useEffect } from 'react';
const HocPattern = () => {
  return (
    <>
      <div className="p-16">
        <h1 className="text-center">En esta sección estamos el patrón de diseño HOC</h1>
        <div className="flex justify-evenly	mt-20">
          <div className="w-50">
            <ServicesHoc />
          </div>
          <div className="w-50">
            <TasksHoc />
          </div>
        </div>
      </div>
    </>
  );
};

export default HocPattern;
