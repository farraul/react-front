import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/hooks/useApp';
import { setCredentials } from 'src/store/user/userSlice';
import { useGetUserInfo } from 'src/store/user/userSelectors';
import { getMe } from 'src/api/user';
import type { AxiosError } from 'axios';
import { useGetUserToken } from './useGetUserToken';

interface UseFetchMe {
  loading: boolean;
}

export const useFetchMe = (): UseFetchMe => {
  const dispatch = useAppDispatch();
  const { token } = useGetUserInfo();
  const isLogged = useGetUserToken();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMe = async (token: string) => {
    setLoading(true);
    try {
      const me = await (await getMe(token)).data;
      if (me) dispatch(setCredentials({ ...me, token }));
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchMe(token);
    }
  }, [token, dispatch]);

  return { loading };
};
