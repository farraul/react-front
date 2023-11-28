import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AppContext } from 'src/AppContext';
import { Path as routes } from 'src/configs/RoutesConfig';
const withAppProviders = (Component: any) => () => {
  const WrapperComponent = () => {
    return (
      <AppContext.Provider
        value={{
          routes,
        }}
      >
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContext.Provider>
    );
  };

  return WrapperComponent;
};

export default withAppProviders;
