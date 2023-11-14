import { Outlet } from 'react-router-dom'; //para mostrar children
import { CacheProvider } from '@emotion/react'; // es para no colisionar material ui y tailwind
import createCache from '@emotion/cache';
import { SnackbarUtilitiesConfigurator } from '../../utilities';
import { Header } from './Header';
import React from 'react';

const myCache = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [],
});

function Layout() {
  return (
    <CacheProvider value={myCache}>
      <SnackbarUtilitiesConfigurator />
      <Header />
      <main>
        <Outlet />
      </main>
    </CacheProvider>
  );
}

export default Layout;
