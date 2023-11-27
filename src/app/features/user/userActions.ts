import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { userServicesConfig } from 'src/services';
import { SignIn, SignUp } from 'src/models/auth.js';
import Cookies from 'js-cookie';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const userLogin = createAsyncThunk(
  userServicesConfig.UserLogin,
  async ({ email, password }: SignIn, { rejectWithValue }) => {
    try {
      const info = await axios.post('/user/login', { email, password }, config);

      Cookies.set('userToken', btoa(info.data.data.userToken), {
        expires: 360000,
      });
      Cookies.set('userId', info.data.data._id, { expires: 360000 });

      return info.data.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

export const userRegister = createAsyncThunk(
  userServicesConfig.UserRegister,
  async ({ firstName, email, password }: SignUp, { rejectWithValue }) => {
    try {
      await axios.post('/user/register', { firstName, email, password }, config);
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
    }
  },
);
