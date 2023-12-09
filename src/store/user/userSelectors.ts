import { useAppSelector } from 'src/hooks/useApp';
import type { RootState } from 'src/store';
import type { UserInfo } from 'src/models/user/user';
import Cookies from 'js-cookie';

export const useGetUserInfo = (): UserInfo => {
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);

  return userInfo;
};

// export const useGetUserIsLogged = (): boolean => {
//   const token = useGetUserInfo()?.token || '';

//   return Boolean(token.trim());
// };

export const useGetUserIsLogged = (): boolean => {
  return !!Cookies.get('jwt_access_token');
};
