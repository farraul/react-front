/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Path } from './path';
import { Spinner } from 'src/components';
import { useGetUserIsLogged } from 'src/app/features/selectors/userSelectors';
import { useFetchMe } from 'src/hooks/useFetchMe';

const Router = () => {
  const isLogged = useGetUserIsLogged();
  const routing = useRoutes(Path(isLogged));
  const { loading } = useFetchMe();

  return loading ? <Spinner /> : routing;
};

export default Router;
