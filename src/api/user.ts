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

export const getUrlsSeo = async (userToken: string, _id: string) => {
  return await instance({
    method: 'POST',
    url: '/api/user/seo',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    data: { _id },
  });
};
