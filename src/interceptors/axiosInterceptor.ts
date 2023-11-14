import axios, { AxiosError, AxiosResponse } from 'axios';
import { SnackbarUtilities } from 'src/utilities';
import { getValidationError } from 'src/utilities/getValidation';
import Cookies from 'js-cookie';
// import { logout } from 'src/app/features/user/userSlices';
// import { useAppDispatch } from 'src/hooks/useApp';

// const dispatch = useAppDispatch();

export const axiosInterceptor = () => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data.message) {
        SnackbarUtilities.success(response.data.message);
      }
      return response;
    },

    (error: AxiosError) => {
      if (error?.response?.data) {
        const { message } = error.response.data as any;

        if (message == 'jwt expired') {
          console.log('jwt expired');
          Cookies.remove('userToken');
          Cookies.remove('userId');
          window.location.href = '/';
        }
      }
      SnackbarUtilities.error(getValidationError(error.message as string));
      return Promise.reject(error);
    },
  );
};
