/* eslint-disable react/react-in-jsx-scope */
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { Path } from './path';
import { Spinner } from 'src/components';
import { useGetUserIsLogged } from 'src/store/user/userSelectors';
import { useFetchMe } from 'src/hooks/useFetchMe';
import { AppContext } from 'src/AppContext';
import { AuthContext } from 'src/auth/AuthContext';
import { object } from 'yup';

const Router = () => {
  const appContext = useContext(AppContext);
  const { loading, me } = useContext(AuthContext);
  const { routes } = appContext;
  console.log({ me, loading });
  const isLogged = useGetUserIsLogged();
  if (loading) return <Spinner />;
  const routing = useRoutes(routes(Object.values(me).length ? true : false));
  // const { loading } = useFetchMe();

  return routing;
};

export default Router;
