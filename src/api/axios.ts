import axios, { AxiosInstance } from 'axios';
export const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_BASE_URL
  : 'http://servidor.com';

export const instance: AxiosInstance = axios.create({
  baseURL,
});
