import { createBrowserRouter } from 'react-router-dom';
import { Layout, Spinner } from 'src/components';
import React, { Suspense, lazy } from 'react';

const ProfilePage = lazy(() => import('src/pages/ProfilePage'));
const ErrorPage = lazy(() => import('src/pages/ErrorPage'));
const CallApiTanStack = lazy(() => import('src/pages/CallApiTanStackPage'));
const CallApiUseFetch = lazy(() => import('src/pages/CallApiUseFetchPage'));
const CallApiFetchPro = lazy(() => import('src/pages/CallApiFecthPro.tsxPage'));
const ClientsPage = lazy(() => import('src/pages/ClientsPage'));
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
            // path: '/home-page',
            element: (
              <Suspense fallback={<Spinner />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: '/times',
            element: (
              <Suspense fallback={<Spinner />}>
                <Times />
              </Suspense>
            ),
          },
          {
            path: '/profile',
            element: (
              <Suspense fallback={<Spinner />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/products',
            element: (
              <Suspense fallback={<Spinner />}>
                <ProductsPage />
              </Suspense>
            ),
          },
          {
            path: '/clients',
            element: (
              <Suspense fallback={<Spinner />}>
                <ClientsPage />
              </Suspense>
            ),
          },
          {
            path: '/seo',
            element: (
              <Suspense fallback={<Spinner />}>
                <Seo />
              </Suspense>
            ),
          },
          {
            path: '/images',
            element: (
              <Suspense fallback={<Spinner />}>
                <Images />
              </Suspense>
            ),
          },
          {
            path: '/call-api-tanstack',
            element: (
              <Suspense fallback={<Spinner />}>
                <CallApiTanStack />
              </Suspense>
            ),
          },
          {
            path: '/call-api-tanstack',
            element: (
              <Suspense fallback={<Spinner />}>
                <CallApiTanStack />
              </Suspense>
            ),
          },
          {
            path: '/call-api-fetch-pro',
            element: (
              <Suspense fallback={<Spinner />}>
                <CallApiFetchPro />
              </Suspense>
            ),
          },
          {
            path: '/call-api-usefetch',
            element: (
              <Suspense fallback={<Spinner />}>
                <CallApiUseFetch />
              </Suspense>
            ),
          },
          {
            path: '/hook-form',
            element: (
              <Suspense fallback={<Spinner />}>
                <HookFormPage />
              </Suspense>
            ),
          },
          {
            path: '/hoc-pattern',
            element: (
              <Suspense fallback={<Spinner />}>
                <HocPattern />
              </Suspense>
            ),
          },
          {
            path: '/hook-imperative-handle',
            element: (
              <Suspense fallback={<Spinner />}>
                <HookImperativeHandle />
              </Suspense>
            ),
          },
          {
            path: '/react-windows',
            element: (
              <Suspense fallback={<Spinner />}>
                <ReactWindowPage />
              </Suspense>
            ),
          },
          {
            path: '/proxy',
            element: (
              <Suspense fallback={<Spinner />}>
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
