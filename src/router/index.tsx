/* eslint-disable react/react-in-jsx-scope */
import { useRoutes, Navigate } from 'react-router-dom';
import { Layout, ProtectedRoutes } from '@/components';
import React, { LazyExoticComponent, lazy, useEffect, useState } from 'react';
import { setCredentials } from '@/app/features/user/userSlices';
import { useGetDetailsQuery } from '@/services';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getMe } from '@/api/user';

const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const CallApi = lazy(() => import('@/pages/CallApi'));
const HomeWpo = lazy(() => import('@/pages/HomeWpo'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const Seo = lazy(() => import('@/pages/Seo'));

const routes = (userToken: string) => {
  const pathSession = (Componente: LazyExoticComponent<() => JSX.Element>) => {
    return userToken ? (
      <Componente />
    ) : (
      <Navigate to={`/?redirect=${window.location.href}`} />
    );
  };

  const notPathSession = (
    Componente: LazyExoticComponent<() => JSX.Element>,
  ) => {
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
              path: '/profile',
              element: pathSession(ProfilePage),
            },
            {
              path: '/dashboard',
              element: pathSession(DashboardPage),
            },
            {
              path: '/wpo',
              element: pathSession(HomeWpo),
            },
            {
              path: '/seo',
              element: pathSession(Seo),
            },
            {
              path: '/call-api',
              element: pathSession(CallApi),
            },
          ],
        },
      ],
    },
  ];
};

const App = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.user.userInfo);
  const routing = useRoutes(routes(userToken));
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMe = async (userToken: string) => {
    setLoading(true);
    try {
      let me = await (await getMe(userToken)).data;
      me['userToken'] = userToken;
      setLoading(false);
      if (me) dispatch(setCredentials(me));
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userToken) {
      console.log({ userToken });
      fetchMe(userToken);
    }
  }, [userToken, dispatch]);

  return <>{loading ? <p>cargando</p> : routing}</>;
};

export default App;
