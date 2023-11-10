import React from 'react';
import Services from './Services';
import Tasks from './Tasks';
const HocPattern = () => {
  return (
    <>
      <div className="p-16">
        <h1 className="text-center">En esta sección estamos el patrón de diseño HOC</h1>
        <div className="flex justify-evenly	mt-20">
          <div className="w-50">
            <Services />
          </div>
          <div className="w-50">
            <Tasks />
          </div>
        </div>
      </div>
    </>
  );
};

export default HocPattern;
