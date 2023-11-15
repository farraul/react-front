import React, { Suspense } from 'react';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './router';
import { axiosInterceptor } from './interceptors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import withAppProviders from './withAppProviders';

axiosInterceptor();
const queryClient = new QueryClient();

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;

const App = () => {
  return (
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
            <AppLayout />
          </Suspense>
          <ReactQueryDevtools />
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default withAppProviders(App)();
