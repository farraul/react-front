import { useContext } from 'react';
import { AuthContext } from 'src/auth/AuthContext';

export const useGetUserIsLogged = (): boolean => {
  const { token } = useContext(AuthContext);

  return Boolean(Object.values(token).length);
};
