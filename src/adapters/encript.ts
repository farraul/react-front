import { jwtDecode } from 'jwt-decode';

export const encript = (data: any) => {
  return jwtDecode(data);
};
