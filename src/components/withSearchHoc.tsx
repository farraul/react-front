import React, { useState, JSX, FC, Component } from 'react';

const WithSearchHoc = ({ Component, dataSet }: { Component: any; dataSet: any }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <input onChange={handleChange} type="text" className="border-2 border-black " />
      <Component query={query} dataSet={dataSet} />
    </>
  );
};

export default WithSearchHoc;
