/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/prefer-default-export */
import { createBrowserRouter, RouteObject} from 'react-router-dom';
import { Layout, ProtectedRoutes } from '@/components';
import {
  ErrorPage,
  HomePage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  CallApi,
  HomeWpo,
  Seo,
} from '@/pages';
import React from 'react';

interface Route {
  path?: string;
  element?: JSX.Element;
  errorElement?: JSX.Element;
  children?: Route[];
  index?: boolean;
}

const routes: Route[] = [
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
            element: <HomePage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/dashboard',
            element: (
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            ),
          },
          {
            path: '/homewpo',
            element: (
              <ProtectedRoutes>
                <HomeWpo />
              </ProtectedRoutes>
            ),
          },
          {
            path: '/seo',
            element: (
              <ProtectedRoutes>
                <Seo />
              </ProtectedRoutes>
            ),
          },
          {
            path: '/call-api',
            element: (
              <ProtectedRoutes>
                <CallApi/>
              </ProtectedRoutes>
            ),
          },
        ],
      },
    ],
  },
]

export const router = createBrowserRouter(routes as RouteObject[]);
