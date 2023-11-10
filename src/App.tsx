import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './router';
import { store } from './app/store';
import { axiosInterceptor } from './interceptors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './lang';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';

axiosInterceptor();
const queryClient = new QueryClient();

console.log(import.meta.env.VITE_PUBLIC_API_URL);
axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API_URL;
console.log({ axios });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Suspense fallback={<div />}>
              <App />
            </Suspense>
            <ReactQueryDevtools />
          </SnackbarProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
