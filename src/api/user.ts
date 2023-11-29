import axios from 'axios';

export const getMe = async (token: string) => {
  return await axios({
    method: 'GET',
    url: '/user/profile',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUrlsSeo = async (id: string) => {
  return await axios({
    method: 'GET',
    url: `/user/seo/${id}`,
  });
};

export const createUrlsSeo = async (id: string, urlSeo: string) => {
  return await axios({
    method: 'POST',
    url: '/user/seo/',
    data: { id, urlSeo },
  });
};
