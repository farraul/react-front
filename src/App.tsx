import React, { Suspense } from 'react';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
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
import { AuthProvider } from 'src/auth/AuthContext';
import DynamicMetaTags from './components/DynamicMetaTags'; // when we change the page its slowly
//why this
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

axiosInterceptor();
const queryClient = new QueryClient();

const emotionCacheOptions = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [],
});

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;
//check
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const App = () => {
  const currentDateFnsLocale = useSelector(selectCurrentDateFnsLocale);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentDateFnsLocale}>
      <CacheProvider value={emotionCacheOptions}>
        <QueryClientProvider client={queryClient}>
          <DynamicMetaTags />
          <AuthProvider>
            <BrowserRouter>
              <SnackbarProvider
                maxSnack={3}
                autoHideDuration={3000}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Suspense fallback={<div />}>
                  <Router />
                </Suspense>
                <ReactQueryDevtools />
              </SnackbarProvider>
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </CacheProvider>
    </LocalizationProvider>
  );
};

export default withAppProviders(App)();
