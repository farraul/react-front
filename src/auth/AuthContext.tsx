import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppSplashScreen from 'src/components/AppSplashScreen';
import { logout } from 'src/store/user/userSlice';
import { setUser } from 'src/store/userSlice';
import { showMessage } from 'src/store/messageSlice';
import jwtService from './services/jwtService/jwtService';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  console.log('AuthProvider  isAuthenticated:', isAuthenticated);
  console.log('AuthProvider  waitAuthCheck:', waitAuthCheck);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('effect auth');
    jwtService.on('onAutoLogin', () => {
      console.log('1');
      dispatch(showMessage({ message: 'Signing in with JWT' }));

      /**
       * Sign in and retrieve user data with stored token
       */
      jwtService
        .signInWithToken()
        .then((user) => {
          success(user, 'Signed in with JWT');
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    jwtService.on('onLogin', (user) => {
      success(user, 'Signed in');
    });

    jwtService.on('onLogout', () => {
      pass('Signed out');

      dispatch(logout());
    });

    jwtService.on('onAutoLogout', (message) => {
      pass(message);

      dispatch(logout());
    });

    jwtService.on('onNoAccessToken', () => {
      pass();
    });

    jwtService.init();

    function success(user, message) {
      console.log('44');
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <AppSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
