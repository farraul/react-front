import React, { Suspense, useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from 'src/auth/AuthContext';
import { routesConfigAuth } from '../configs/routesConfigAuth';
import { routesConfigUnAuth } from '../configs/routesConfigUnAuth';

export const RouterProviders = () => {
  const isLogin = (): boolean => {
    const { me } = useContext(AuthContext);
    return Boolean(Object.values(me).length);
  };
  return (
    <Suspense fallback={<div />}>
      {isLogin() ? (
        <RouterProvider router={routesConfigAuth} />
      ) : (
        <RouterProvider router={routesConfigUnAuth} />
      )}
    </Suspense>
  );
};
