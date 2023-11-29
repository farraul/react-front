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
import { selectCurrentDateFnsLocale } from './store/i18nSlice';

axiosInterceptor();
const queryClient = new QueryClient();

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;

const App = () => {
  const currentDateFnsLocale = useSelector(selectCurrentDateFnsLocale);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentDateFnsLocale}>
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
    </LocalizationProvider>
  );
};

export default withAppProviders(App)();
