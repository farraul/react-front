import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './router';
import { store } from './app/store';
import { axiosInterceptor } from './interceptors';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// axiosInterceptor();
const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback={<div />}>
            <App />
          </Suspense>
          <ReactQueryDevtools />
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
