import { AxiosError, AxiosResponse } from 'axios';
import { instance as axios } from '@/api/axios';
import { SnackbarUtilities } from '@/utilities';
import { getValidationError } from '@/utilities/getValidation';

export const axiosInterceptor = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log({ response });

      if (response.data.message) {
        SnackbarUtilities.success(response.data.message);
      }
      return response;
      // getValidationSucces(response.config.url as unknown as string),
    },

    (error: AxiosError) => {
      SnackbarUtilities.error(getValidationError(error.message as string));
      return Promise.reject(error);
    },
  );
};
