import { useState, useEffect } from 'react';
import { useAppDispatch } from 'src/hooks/useApp';
import { setCredentials } from 'src/app/features/user/userSlices';
import { useGetUserInfo, useGetUserIsLogged } from 'src/app/features/selectors/userSelectors';
import { getMe } from 'src/api/user';
import type { AxiosError } from 'axios';

interface UseFetchMe {
  loading: boolean;
}

export const useFetchMe = (): UseFetchMe => {
  const dispatch = useAppDispatch();
  const { userToken } = useGetUserInfo();
  const isLogged = useGetUserIsLogged();
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
    if (isLogged) {
      fetchMe(userToken);
    }
  }, [userToken, dispatch]);

  return { loading };
};
