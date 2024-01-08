import { createBrowserRouter } from 'react-router-dom';
import { Spinner } from 'src/components';
import React, { Suspense, lazy } from 'react';
import Layout from 'src/layouts';
import NewUrlTwo from 'src/components/profile/NewUrlTwo';
import NewUrl from 'src/components/profile/NewUrl';

const ProfilePage = lazy(() => import('src/pages/Authenticated/ProfilePage'));
const ErrorPage = lazy(() => import('src/pages/Authenticated/ErrorPage'));
const CallApiTanStack = lazy(
  () => import('src/pages/Authenticated/CallApiPages/CallApiTanStackPage'),
);
const CallApiUseFetch = lazy(
  () => import('src/pages/Authenticated/CallApiPages/CallApiUseFetchPage'),
);
const CallApiFetchPro = lazy(
  () => import('src/pages/Authenticated/CallApiPages/CallApiFecthPro.tsxPage'),
);
const ClientsPage = lazy(() => import('src/pages/Authenticated/ClientsPage'));
const HomePage = lazy(() => import('src/pages/Authenticated/HomePage'));
const ProductsPage = lazy(() => import('src/pages/Authenticated/ProductsPage'));
const Seo = lazy(() => import('src/pages/Authenticated/SeoPage'));
const Images = lazy(() => import('src/pages/Authenticated/ImagesPage'));
const HocPattern = lazy(() => import('src/pages/Authenticated/HocPatternPage'));
const Times = lazy(() => import('src/pages/Authenticated/TimesPage'));
const HookFormPage = lazy(() => import('src/pages/Authenticated/HookFormPage'));
const HookImperativeHandle = lazy(() => import('src/pages/Authenticated/HookImperativeHandlePage'));
const ReactWindowPage = lazy(() => import('src/pages/Authenticated/ReactWindowPage'));
const ProxyPage = lazy(() => import('src/pages/Authenticated/ProxyPage'));

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
            children: [
              {
                path: '/profile/newurl',
                // index: true,
                element: (
                  <Suspense fallback={<Spinner />}>
                    <NewUrl />
                  </Suspense>
                ),
              },
              {
                path: '/profile/newurltwo',

                element: (
                  <Suspense fallback={<Spinner />}>
                    <NewUrlTwo />
                  </Suspense>
                ),
              },
            ],
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
