import { SnackbarProvider } from 'notistack';
import { Outlet } from 'react-router-dom'; //para mostrar children
import { CacheProvider } from '@emotion/react'; // es para no colisionar material ui y tailwind
import createCache from '@emotion/cache';
import { SnackbarUtilitiesConfigurator } from '../utilities';
import Header from './Header';
import HeaderNotAuth from './HeaderNotAuth';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesNotAuth } from '@/models/auth';

//outlet los children
const myCache = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [],
});

function Layout() {
  const [isntAuth, setIsntAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === RoutesNotAuth.Login ||
      location.pathname === RoutesNotAuth.Register
    ) {
      setIsntAuth(false);
      console.log(isntAuth);
    } else {
      setIsntAuth(true);
      console.log(location.pathname);
      console.log({ isntAuth });
    }
  }, [location.pathname]);

  return (
    <CacheProvider value={myCache}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <SnackbarUtilitiesConfigurator />
        {/* {isntAuth ? <Header /> : <HeaderNotAuth />} */}
        <Header />
        <main>
          <Outlet />
        </main>
      </SnackbarProvider>
    </CacheProvider>
  );
}

export default Layout;
