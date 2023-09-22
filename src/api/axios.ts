import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  // baseURL: import.meta.env.VITE_FIRST_ENDPOINT
});

export default instance;