import { Navigate } from 'react-router-dom';
import { Layout } from 'src/components';
import React, { LazyExoticComponent, lazy } from 'react';

const ProfilePage = lazy(() => import('src/pages/ProfilePage'));
const ErrorPage = lazy(() => import('src/pages/ErrorPage'));
const CallApiTanStack = lazy(() => import('src/pages/CallApiTanStackPage'));
const CallApiUseFetch = lazy(() => import('src/pages/CallApiUseFetchPage'));
const CallApiFetchPro = lazy(() => import('src/pages/CallApiFecthPro.tsxPage'));
const Clients = lazy(() => import('src/pages/ClientsPage'));
const RegisterPage = lazy(() => import('src/pages/RegisterPage'));
const HomePage = lazy(() => import('src/pages/HomePage'));
const LoginPage = lazy(() => import('src/pages/LoginPage'));
const ProductsPage = lazy(() => import('src/pages/ProductsPage'));
const Seo = lazy(() => import('src/pages/SeoPage'));
const Images = lazy(() => import('src/pages/ImagesPage'));
const HocPattern = lazy(() => import('src/pages/TasksHoc/HocPatternPage'));
const Times = lazy(() => import('src/pages/TimesPage'));
const HookFormPage = lazy(() => import('src/pages/HookFormPage'));
const HookImperativeHandle = lazy(
  () => import('src/pages/HookImperativeHandlePage/HookImperativeHandlePage'),
);
const ReactWindowPage = lazy(() => import('src/pages/ReactWindowPage'));
const ProxyPage = lazy(() => import('src/pages/ProxyPage'));

export const Path = (isLogged: boolean) => {
  const pathSession = (Componente: LazyExoticComponent<() => JSX.Element>) => {
    return isLogged ? <Componente /> : <Navigate to={`/?redirect=${window.location.href}`} />;
  };

  const notPathSession = (Componente: LazyExoticComponent<() => JSX.Element>) => {
    return isLogged ? <Navigate to={'/home-page'} /> : <Componente />;
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
              path: '/products',
              element: pathSession(ProductsPage),
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
              path: '/images',
              element: pathSession(Images),
            },
            {
              path: '/call-api-tanstack',
              element: pathSession(CallApiTanStack),
            },
            {
              path: '/call-api-tanstack',
              element: pathSession(CallApiTanStack),
            },
            {
              path: '/call-api-fetch-pro',
              element: pathSession(CallApiFetchPro),
            },
            {
              path: '/call-api-usefetch',
              element: pathSession(CallApiUseFetch),
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
              path: '/hook-imperative-handle',
              element: pathSession(HookImperativeHandle),
            },
            {
              path: '/react-windows',
              element: pathSession(ReactWindowPage),
            },
            {
              path: '/proxy',
              element: pathSession(ProxyPage),
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
