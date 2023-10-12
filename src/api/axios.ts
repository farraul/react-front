import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
  // baseURL: import.meta.env.VITE_FIRST_ENDPOINT
});


