import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router';
import { store } from './app/store';
import { axiosInterceptor } from './interceptors';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


axiosInterceptor();
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')  as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense fallback={""}>
        <RouterProvider router={router} />
        </Suspense>
        <ReactQueryDevtools/>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode >,
);
