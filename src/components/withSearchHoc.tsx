import React, { useState } from 'react';

const WithSearchHoc = (Component, dataSet) => {
  const [query, setQuery] = useState('');

  //logica
  //pasar a minusculas por temas backend

  const handleChange = (e: any) => {
    setQuery(e.target.value);
  };
  return (
    <>
      <input onChange={handleChange} type="text" />
      <Component query={query} dataSet={dataSet} />
    </>
  );
};

export default WithSearchHoc;
