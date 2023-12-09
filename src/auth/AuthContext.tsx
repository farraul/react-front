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
import { Spinner } from 'src/components';

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
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get('jwt_access_token') || '');
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('auth');

    jwtService.on('onAutoLogin', () => {
      console.log('jwtService.on  onAutoLogin:');
      dispatch(showMessage({ message: 'Signing in with JWT' }));

      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, 'Signed in with JWT');

          // success(user, 'Signed in with JWT');
        })
        .catch((error) => {
          pass(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    jwtService.on('onLogin', (user: any) => {
      console.log('jwtService.on  onLogin:');

      success(user, 'Signed in');
      dispatch(setCredentials(user));
      setMe(user);
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.on('onLogout', () => {
      pass('Signed out');

      dispatch(logout());
    });

    jwtService.init();

    function success(user: any, message: any) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setCredentials(user)),
        setMe(user),
        // You can receive data in here before app initialization
      ]).then((values) => {
        console.log('false');
        setWaitAuthCheck(false);
      });
    }

    function pass(message?: any) {
      console.log('pass');
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <Spinner />
  ) : (
    <AuthContext.Provider value={{ token, setToken, me, setMe, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//   const value = { token, setToken, me, setMe, loading, setLoading };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
