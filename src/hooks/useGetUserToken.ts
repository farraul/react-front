import { useContext } from 'react';
import { AuthContext } from 'src/auth/AuthContext';

export const useGetUserToken = (): string => {
  const { token } = useContext(AuthContext);

  return token;
};
