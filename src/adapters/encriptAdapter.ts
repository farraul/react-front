import { jwtDecode } from 'jwt-decode';

export const encriptAdapter = (data: any) => {
  return jwtDecode(data);
};
