import { useAppSelector } from 'src/hooks/useApp';
import type { RootState } from 'src/store';
import type { UserInfo } from 'src/models/user/user';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/AuthContext';

//check
export const useGetUserInfo = (): UserInfo => {
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);

  return userInfo;
};

export const useGetUserIsLogged = (): boolean => {
  const { token } = useContext(AuthContext);
  return Boolean(Object.values(token).length);
};

export const useGetUserToken = (): string => {
  const { token } = useContext(AuthContext);

  return token;
};
