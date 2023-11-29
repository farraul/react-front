/* eslint-disable react/react-in-jsx-scope */
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { Path } from './path';
import { Spinner } from 'src/components';
import { useGetUserIsLogged } from 'src/store/selectors/userSelectors';
import { useFetchMe } from 'src/hooks/useFetchMe';
import { AppContext } from 'src/AppContext';

const Router = () => {
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const isLogged = useGetUserIsLogged();
  const routing = useRoutes(routes(isLogged));
  const { loading } = useFetchMe();

  return loading ? <Spinner /> : routing;
};

export default Router;
