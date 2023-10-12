import { instance } from './axios';

export const getMe = async (userToken: string) => {
  return await instance({
    method: 'GET',
    url: 'api/user/profile',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
