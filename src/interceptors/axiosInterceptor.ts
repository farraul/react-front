import { AxiosError, AxiosResponse } from 'axios';
import { instance as axios } from '@/api/axios';
import { SnackbarUtilities } from '@/utilities';
import { getValidationError } from '@/utilities/getValidation';

export const axiosInterceptor = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      SnackbarUtilities.success(
        response.data.message,
        // getValidationSucces(response.config.url as unknown as string),
      );
      return response;
    },

    (error: AxiosError) => {
      SnackbarUtilities.error(getValidationError(error.message as string));
      return Promise.reject(error);
    },
  );
};
