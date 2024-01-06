import { Outlet } from 'react-router-dom'; //para mostrar children
import { SnackbarUtilitiesConfigurator } from 'src/utilities';
import { Header } from '../components/Header';
import React from 'react';

function Layout() {
  console.log('l');
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
