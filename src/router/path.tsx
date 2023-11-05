import { Navigate } from 'react-router-dom';
import { Layout } from '@/components';
import React, { LazyExoticComponent, lazy } from 'react';

const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const CallApi = lazy(() => import('@/pages/CallApi'));
const Clients = lazy(() => import('@/pages/Clients'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const Seo = lazy(() => import('@/pages/SeoPage'));
const Images = lazy(() => import('@/pages/ImagesPage'));
const HocPattern = lazy(() => import('@/pages/HocPattern'));
const Times = lazy(() => import('@/pages/TimesPage'));
const HookFormPage = lazy(() => import('@/pages/HookFormPage'));

export const Path = (userToken: string) => {
  const pathSession = (Componente: LazyExoticComponent<() => JSX.Element>) => {
    return userToken ? <Componente /> : <Navigate to={`/?redirect=${window.location.href}`} />;
  };

  const notPathSession = (Componente: LazyExoticComponent<() => JSX.Element>) => {
    return userToken ? <Navigate to={'/home-page'} /> : <Componente />;
  };

  return [
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
              element: notPathSession(LoginPage),
            },
            {
              path: '/register',
              element: notPathSession(RegisterPage),
            },
            {
              path: '/home-page',
              element: pathSession(HomePage),
            },
            {
              path: '/times',
              element: pathSession(Times),
            },
            {
              path: '/profile',
              element: pathSession(ProfilePage),
            },
            {
              path: '/dashboard',
              element: pathSession(DashboardPage),
            },
            {
              path: '/clients',
              element: pathSession(Clients),
            },
            {
              path: '/seo',
              element: pathSession(Seo),
            },
            {
              path: '/call-api',
              element: pathSession(CallApi),
            },
            {
              path: '/images',
              element: pathSession(Images),
            },
            {
              path: '/hook-form',
              element: pathSession(HookFormPage),
            },
            {
              path: '/hoc-pattern',
              element: pathSession(HocPattern),
            },
            {
              path: '*',
              element: <ErrorPage />,
            },
          ],
        },
      ],
    },
  ];
};
