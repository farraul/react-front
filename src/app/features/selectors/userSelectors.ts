import { useAppSelector } from "src/hooks/useApp";
import type { RootState } from '../../store';
import type { UserInfo } from 'src/models/user/user';

export const useGetUserInfo = (): UserInfo => {
  // Rename userInfo to be just .info
  const userInfo = useAppSelector((state: RootState) => state.user.userInfo);

  return userInfo;
}

export const useGetUserIsLogged = (): boolean => {
  const userToken = useGetUserInfo()?.userToken || '';

  return Boolean(userToken.trim());
}
