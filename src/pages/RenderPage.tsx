import React, { useEffect, useState } from 'react';

interface RenderProps {
  render: boolean;
}

const RenderPage = ({ render = false }: RenderProps) => {
  useEffect(() => {
    console.log('test');
  }, [render]);

  return (
    <>
      {JSON.stringify(render)}
      RenderPage
    </>
  );
};

export default RenderPage;
