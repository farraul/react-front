import { AxiosError, AxiosResponse } from 'axios';
import axios from '@/api/axios';
import { SnackbarUtilities } from '@/utilities';
import {
  getValidationError,
  getValidationSucces,
} from '@/utilities/getValidation';

export const axiosInterceptor = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log({response})

       SnackbarUtilities.success(
         getValidationSucces(response.status as unknown as string),
       );

      return response;
    },

    (error: AxiosError) => {
      SnackbarUtilities.error(
        getValidationError(error.message as string),
      );
      return Promise.reject(error);
    },
  );
};
