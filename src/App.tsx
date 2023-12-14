import React, { Suspense, useContext } from 'react';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { axiosInterceptor } from './interceptors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import withAppProviders from './withAppProviders';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from 'react-redux';
import { selectCurrentDateFnsLocale } from './store/i18n/i18nSlice';
import { AuthContext, AuthProvider } from 'src/auth/AuthContext';
import DynamicMetaTags from './components/DynamicMetaTags'; // when we change the page its slowly
//why this
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useAppSelector } from './hooks/useApp';
import { RouterProvider } from 'react-router-dom';
import { useGetUserIsLogged } from './store/user/userSelectors';

import { routesConfigUnAuth } from './configs/routesConfigUnAuth';
import { routesConfigAuth } from './configs/routesConfigAuth';

axiosInterceptor();
const queryClient = new QueryClient();

const emotionCacheOptions = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [],
});

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const App = () => {
  const { userInfo } = useAppSelector((state: { user: any }) => state.user);

  // const isLogin = useGetUserIsLogged();
  const isLogin = (): boolean => {
    const { me } = useContext(AuthContext);
    console.log(Boolean(Object.values(me).length));
    return Boolean(Object.values(me).length);
  };

  console.log({ isLogin });
  // const routes = isLogin() ? routesConfigAuth : routesConfigUnAuth;
  // console.log({ routes });

  const currentDateFnsLocale = useSelector(selectCurrentDateFnsLocale);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentDateFnsLocale}>
      <CacheProvider value={emotionCacheOptions}>
        <QueryClientProvider client={queryClient}>
          <DynamicMetaTags />
          <AuthProvider>
            <SnackbarProvider
              maxSnack={2}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Suspense fallback={<div />}>
                {isLogin() ? (
                  <RouterProvider router={routesConfigAuth} />
                ) : (
                  <RouterProvider router={routesConfigUnAuth} />
                )}
              </Suspense>
              <ReactQueryDevtools />
            </SnackbarProvider>
          </AuthProvider>
        </QueryClientProvider>
      </CacheProvider>
    </LocalizationProvider>
  );
};

export default withAppProviders(App)();
