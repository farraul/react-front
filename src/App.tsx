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
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en-GB';
// const locales = { 'en-us': undefined, 'es': es, 'zh-cn': zhCN, de };

axiosInterceptor();
const queryClient = new QueryClient();

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;

const App = () => {
  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale="es">
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    // </LocalizationProvider>
  );
};

export default withAppProviders(App)();
