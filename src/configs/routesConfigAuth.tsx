import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Layout } from 'src/components';
import React, { LazyExoticComponent, Suspense, lazy } from 'react';

const ProfilePage = lazy(() => import('src/pages/ProfilePage'));
const ErrorPage = lazy(() => import('src/pages/ErrorPage'));
const CallApiTanStack = lazy(() => import('src/pages/CallApiTanStackPage'));
const CallApiUseFetch = lazy(() => import('src/pages/CallApiUseFetchPage'));
const CallApiFetchPro = lazy(() => import('src/pages/CallApiFecthPro.tsxPage'));
const Clients = lazy(() => import('src/pages/ClientsPage'));
const HomePage = lazy(() => import('src/pages/HomePage'));
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

export const routesConfigAuth = createBrowserRouter([
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
            path: '/home-page',
            element: (
              <Suspense fallback={<>loading</>}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: '/times',
            element: (
              <Suspense fallback={<>loading</>}>
                <Times />
              </Suspense>
            ),
          },
          {
            path: '/profile',
            element: (
              <Suspense fallback={<>loading</>}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/products',
            element: (
              <Suspense fallback={<>loading</>}>
                <ProductsPage />
              </Suspense>
            ),
          },
          {
            path: '/clients',
            element: (
              <Suspense fallback={<>loading</>}>
                <Clients />
              </Suspense>
            ),
          },
          {
            path: '/seo',
            element: (
              <Suspense fallback={<>loading</>}>
                <Seo />
              </Suspense>
            ),
          },
          {
            path: '/images',
            element: (
              <Suspense fallback={<>loading</>}>
                <Images />
              </Suspense>
            ),
          },
          {
            path: '/call-api-tanstack',
            element: (
              <Suspense fallback={<>loading</>}>
                <CallApiTanStack />
              </Suspense>
            ),
          },
          {
            path: '/call-api-tanstack',
            element: (
              <Suspense fallback={<>loading</>}>
                <CallApiTanStack />
              </Suspense>
            ),
          },
          {
            path: '/call-api-fetch-pro',
            element: (
              <Suspense fallback={<>loading</>}>
                <CallApiFetchPro />
              </Suspense>
            ),
          },
          {
            path: '/call-api-usefetch',
            element: (
              <Suspense fallback={<>loading</>}>
                <CallApiUseFetch />
              </Suspense>
            ),
          },
          {
            path: '/hook-form',
            element: (
              <Suspense fallback={<>loading</>}>
                <HookFormPage />
              </Suspense>
            ),
          },
          {
            path: '/hoc-pattern',
            element: (
              <Suspense fallback={<>loading</>}>
                <HocPattern />
              </Suspense>
            ),
          },
          {
            path: '/hook-imperative-handle',
            element: (
              <Suspense fallback={<>loading</>}>
                <HookImperativeHandle />
              </Suspense>
            ),
          },
          {
            path: '/react-windows',
            element: (
              <Suspense fallback={<>loading</>}>
                <ReactWindowPage />
              </Suspense>
            ),
          },
          {
            path: '/proxy',
            element: (
              <Suspense fallback={<>loading</>}>
                <ProxyPage />
              </Suspense>
            ),
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
