import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
const withAppProviders = (Component: any) => () => {
  const WrapperComponent = () => {
    return (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  };

  return WrapperComponent;
};

export default withAppProviders;
