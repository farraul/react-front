import * as React from 'react';
import { useEffect, useState, createContext } from 'react';
import { useDispatch } from 'react-redux';
import AppSplashScreen from 'src/components/AppSplashScreen';
import { logout, setCredentials } from 'src/store/user/userSlice';
import { setUser } from 'src/store/userSlice';
import { showMessage } from 'src/store/messageSlice';
import jwtService from './services/jwtService/jwtService';
import { getMe } from 'src/api/user';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { AppContext } from 'src/AppContext';
import { type } from 'os';
import { useAppDispatch } from 'src/hooks/useApp';

type PropsProvider = {
  children: React.ReactNode;
};

type Values = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  me: any;
  setMe: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<Values>({
  token: '',
  setToken: () => false,
  me: {},
  setMe: () => false,
  loading: false,
  setLoading: () => false,
});

export const AuthProvider = ({ children }: PropsProvider) => {
  const [me, setMe] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(Cookies.get('jwt_access_token') || '');

  const dispatch = useAppDispatch();

  // const fetchMe = async (token: string) => {
  //   setLoading(true);
  //   try {
  //     const me = await (await getMe(token)).data;
  //     console.log({ me });
  //     if (me) dispatch(setCredentials({ ...me, token }));
  //     setMe(me);
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     console.log(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     fetchMe(token);
  //   }
  // }, [token]);

  useEffect(() => {
    jwtService.on('onLogin', (user) => {
      console.log('onlogin');
      // success(user, 'Signed in');      success(user, 'Signed in');
      success(user, 'Signed in');

      console.log({ me });
      // if (me)
      dispatch(setCredentials(user));
      setMe(user);
      console.log({ user });
    });

    jwtService.on('onAutoLogin', () => {
      console.log('onoutlogin');
      dispatch(showMessage({ message: 'Signing in with JWT' }));

      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          dispatch(setCredentials(user));
          setMe(user);

          // success(user, 'Signed in with JWT');
        })
        .catch((error) => {
          // pass(error.message);
        });
    });

    jwtService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }
    }
    console.log({ dispatch });
  }, [dispatch]);

  const value = { token, setToken, me, setMe, loading, setLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
