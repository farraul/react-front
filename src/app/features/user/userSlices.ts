/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userRegister, userLogin } from './userActions';
import { User, UserInfo } from '@/models/user/user';
import {Product} from "@/models/product"
// si esta jwt en localstorage colocarlo en el estado.
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState: User = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({ //redux: para estados 
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      if (state.userInfo && state.userInfo.products) {
        state.userInfo.products = { ...state.userInfo.products, ...action.payload };
      }
    }
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload as UserInfo;
        state.userToken = action.payload.userToken;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        debugger
      })
      // register user
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { logout, setCredentials } = userSlice.actions;

export default userSlice.reducer;
