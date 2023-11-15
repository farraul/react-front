/* eslint-disable react/react-in-jsx-scope */
import { useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setCredentials } from 'src/app/features/user/userSlices';
import { useAppDispatch, useAppSelector } from 'src/hooks/useApp';
import { getMe } from 'src/api/user';
import { Path } from './path';
import { Spinner } from 'src/components';
import { AxiosError } from 'axios';

const Router = () => {
  console.log('App');
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.user.userInfo);
  const routing = useRoutes(Path(userToken));
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMe = async (userToken: string) => {
    setLoading(true);
    try {
      const me = await (await getMe(userToken)).data;
      if (me) dispatch(setCredentials({ ...me, userToken }));
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchMe(userToken);
    }
  }, [userToken, dispatch]);

  return <>{loading ? <Spinner /> : routing}</>;
};

export default Router;
