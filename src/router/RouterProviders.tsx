import React, { Suspense, useContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthContext } from 'src/auth/AuthContext';
import { routesConfigAuth } from '../configs/routesConfigAuth';
import { routesConfigUnAuth } from '../configs/routesConfigUnAuth';
import { useGetUserIsLogged } from 'src/store/user/userSelectors';
import { Spinner } from 'src/components';

export const RouterProviders = () => {
  const isLogin = useGetUserIsLogged();

  return (
    <Suspense fallback={<Spinner />}>
      {isLogin ? (
        <RouterProvider router={routesConfigAuth} />
      ) : (
        <RouterProvider router={routesConfigUnAuth} />
      )}
    </Suspense>
  );
};
