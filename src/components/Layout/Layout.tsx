import { Outlet } from 'react-router-dom'; //para mostrar children
import createCache from '@emotion/cache';
import { SnackbarUtilitiesConfigurator } from 'src/utilities';
import { Header } from './Header';
import React from 'react';

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
