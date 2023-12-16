import axios, { AxiosError, AxiosResponse } from 'axios';
import { SnackbarUtilities, getValidationError } from 'src/utilities';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';

export const axiosInterceptor = () => {
  //check 2 times wehn he login
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data.message) {
        console.log('AxiosInterceptor: ', response.data.message);
        SnackbarUtilities.success(response.data.message);
      }
      return response;
    },

    (error: AxiosError) => {
      if (error?.response?.data) {
        const { message } = error.response.data as any;

        if (message == 'jwt expired') {
          console.log('jwt expired');
          Cookies.remove('jwt_access_token');
          Cookies.remove('userId');
          redirect('/');
        }
      }

      SnackbarUtilities.error(getValidationError(error.message as string));
      return Promise.reject(error);
    },
  );
};
