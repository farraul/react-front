import { Navigate } from 'react-router-dom';
import { Layout } from 'src/components';
import React, { LazyExoticComponent, lazy } from 'react';

const ErrorPage = lazy(() => import('src/pages/ErrorPage'));

import { createBrowserRouter } from 'react-router-dom';

export const routesConfigUnAuth = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            async lazy() {
              const { LoginPage } = await import('src/pages/LoginPage');
              return { Component: LoginPage };
            },
          },
          {
            async lazy() {
              const { RegisterPage } = await import('src/pages/RegisterPage');
              return { Component: RegisterPage };
            },
          },
          {
            path: '*',
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
