/* eslint-disable react/react-in-jsx-scope */
import { useRoutes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { setCredentials } from '@/app/features/user/userSlices';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import { getMe } from '@/api/user';
import { Path } from './path';

const App = () => {
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.user.userInfo);
  const routing = useRoutes(Path(userToken));
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
