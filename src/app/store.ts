import { configureStore } from '@reduxjs/toolkit';
import { userApi } from 'src/services/jwtService';
import userReducer from './features/user/userSlices'; // We change name

export const store = configureStore({
  reducer: {
    user: userReducer, // State
    [userApi.reducerPath]: userApi.reducer, // API
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
