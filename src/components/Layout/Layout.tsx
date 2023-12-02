import { Outlet } from 'react-router-dom'; //para mostrar children
import createCache from '@emotion/cache';
import { SnackbarUtilitiesConfigurator } from 'src/utilities';
import { Header } from './Header';
import React from 'react';

const emotionCacheOptions = createCache({
  key: 'my-prefix-key',
  stylisPlugins: [],
});

function Layout() {
  return (
    <>
      <SnackbarUtilitiesConfigurator />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
