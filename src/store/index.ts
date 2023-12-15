import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createReducer from './rootReducer';

if (import.meta.env.MODE === 'development' && import.meta.hot) {
  import.meta.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

const middlewares: any = [];
if (import.meta.env.MODE === 'development') {
  const logger = createLogger({ collapsed: (getState, action, logEntry) => !logEntry?.error });
  middlewares.push(logger);
}

const store: any = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: import.meta.env.MODE === 'development',
});

store.asyncReducers = {};


//check
export const injectReducer = (key: any, reducer: any) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
