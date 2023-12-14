import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { AppContext } from 'src/AppContext';
const withAppProviders = (Component: any) => () => {
  console.log('withrouter');
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
