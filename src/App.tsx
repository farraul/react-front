import React from 'react';
import './styles/index.css';
import { axiosInterceptor } from './interceptors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import withAppProviders from './withAppProviders';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from 'react-redux';
import { AuthProvider } from 'src/auth/AuthContext';
import DynamicMetaTags from './components/MetaTags/DynamicMetaTags'; // when we change the page its slowly
import createCache from '@emotion/cache';
import RouterProvider from './router/RouterProvider';
import { selectCurrentDateFnsLocale } from './store/i18n/i18Selectors';
import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from './hooks/useApp';
import { CssBaseline } from '@mui/material';

axiosInterceptor();
const queryClient = new QueryClient();

const emotionCacheOptions = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [],
});

axios.defaults.baseURL = `${import.meta.env.VITE_PUBLIC_API_URL}/api`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const App = () => {
  const currentDateFnsLocale = useSelector(selectCurrentDateFnsLocale);
  const { theme, mode } = useAppSelector((state) => state.settings);
  console.log('App  color:', mode);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={currentDateFnsLocale}>
        <QueryClientProvider client={queryClient}>
          <DynamicMetaTags />
          <AuthProvider>
            {/* <ThemeProvider theme={theme}> */}
            <CssBaseline />

              <SnackbarProvider
                maxSnack={2}
                autoHideDuration={3000}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <RouterProvider />
                <ReactQueryDevtools />
              </SnackbarProvider>
            {/* </ThemeProvider> */}
          </AuthProvider>
        </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default withAppProviders(App)();
