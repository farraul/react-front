import React, { Suspense, lazy, useContext } from 'react';
import { RouterProvider as Provider } from 'react-router-dom';
import { routesConfigAuth } from '../configs/router/routesConfigAuth';
import { routesConfigUnAuth } from '../configs/i18n/routesConfigUnAuth';
import { Spinner } from 'src/components';
import { useGetUserIsLogged } from 'src/hooks/useGetUserIsLogged';

//check good in this file?

export const RouterProvider = () => {
  const isLogin = useGetUserIsLogged();
  console.log({ isLogin });

  return (
    <Suspense fallback={<Spinner />}>
      {isLogin ? <Provider router={routesConfigAuth} /> : <Provider router={routesConfigUnAuth} />}
    </Suspense>
  );
};
