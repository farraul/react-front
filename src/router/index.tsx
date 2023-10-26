/* eslint-disable react/react-in-jsx-scope */
import { useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setCredentials } from '@/app/features/user/userSlices';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getMe } from '@/api/user';
import { Path } from './path';
import { Spinner } from '@/components';
import { AxiosError } from 'axios';

const App = () => {
  console.log('App');
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.user.userInfo);
  console.log({ userToken });
  const routing = useRoutes(Path(userToken));
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMe = async (userToken: string) => {
    setLoading(true);
    try {
      let me = await (await getMe(userToken)).data;
      me['userToken'] = userToken;
      setLoading(false);
      if (me) dispatch(setCredentials(me));
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (userToken) {
      console.log({ userToken });
      fetchMe(userToken);
    }
  }, [userToken, dispatch]);

  return <>{loading ? <Spinner /> : routing}</>;
};

export default App;
