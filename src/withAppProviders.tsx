import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const withAppProviders = (Component: any) => (props: any) => {
  console.log({ props });
  const WrapperComponent = () => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

  return WrapperComponent;
};
