import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { StyledEngineProvider } from '@mui/material';
const withAppProviders = (Component: any) => () => {
  const WrapperComponent = () => {
    return (
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <Component />
        </StyledEngineProvider>
      </Provider>
    );
  };

  return WrapperComponent;
};

export default withAppProviders;
