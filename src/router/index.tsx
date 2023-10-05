/* eslint-disable react/react-in-jsx-scope */
import { useRoutes } from 'react-router-dom';
import { Layout, ProtectedRoutes } from '@/components';
import {
  ErrorPage,
  // LoginPage,
  RegisterPage,
  // DashboardPage,
  CallApi,
  HomeWpo,
} from '@/pages';
import React, { lazy, useEffect } from 'react';
import { setCredentials } from '@/app/features/user/userSlices';
import { useGetDetailsQuery } from '@/services';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getMe } from '@/api/axios';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const Seo = lazy(() => import('@/pages/Seo'));

// interface Route {
//   path?: string;
//   element?: JSX.Element;
//   errorElement?: JSX.Element;
//   children?: Route[];
//   index?: boolean;
// }

const routes = () => {
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
              path: '/wpo',
              element: (
                <ProtectedRoutes>
                  <HomeWpo />,
                </ProtectedRoutes>
              ),
            },
            {
              path: '/seo',
              element: (
                // <ProtectedRoutes>
                <Seo />
              ),
              // </ProtectedRoutes>
            },
            {
              path: '/call-api',
              element: (
                <ProtectedRoutes>
                  <CallApi />
                </ProtectedRoutes>
              ),
            },
          ],
        },
      ],
    },
  ];
};

const App = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.user);
  const routing = useRoutes(routes());

  // if (userInfo?.userToken) {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const { data } = useGetDetailsQuery('userDetails', {
  //     pollingInterval: 900000,
  //   });
  //   if (data) dispatch(setCredentials(data));
  // }

  const fetchMe = async (userToken: string) => {
    try {
      console.log('in');
      const me = await (await getMe(userToken)).data;

      console.log({ me });
      if (me) dispatch(setCredentials(me));
      console.log(setCredentials(me));
    } catch (error: unknown) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchMe(userToken);
    }
  }, [userToken, dispatch]);

  return <>{routing}</>;
};

// export const router = createBrowserRouter(routes as RouteObject[]);
export default App;
