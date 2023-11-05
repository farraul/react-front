export const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_BASE_URL_DEV
  : import.meta.env.VITE_APP_BASE_URL_PRO;
