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

export const getUrlsSeo = async (id: string) => {
  return await instance({
    method: 'GET',
    url: `/api/user/seo/${id}`,
  });
};

export const createUrlsSeo = async (id: string, urlSeo: string) => {
  return await instance({
    method: 'POST',
    url: `api/user/seo/`,
    data: { id, urlSeo },
  });
};
