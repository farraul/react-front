import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: import.meta.env.VITE_FIRST_ENDPOINT
});

export const getMe = async (userToken: string) => {
  return await instance({
    method: 'GET',
    url: 'api/user/profile',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export default instance;
