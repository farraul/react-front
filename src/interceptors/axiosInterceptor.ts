import { AxiosError, AxiosResponse } from 'axios';
import { instance as axios } from '@/api/axios';
import { SnackbarUtilities } from '@/utilities';
import { getValidationError } from '@/utilities/getValidation';
import Cookies from 'js-cookie';
// import { logout } from '@/app/features/user/userSlices';
// import { useAppDispatch } from '@/hooks/useApp';

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
        const data = error?.response?.data as any;
        const message = data.message;
        console.log({ message });
        if (message == 'jwt expired') {
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
