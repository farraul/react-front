/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { instance as axios } from '../../../api/axios.js';
import { userServicesConfig } from '@/services';
import { SignIn, SignUp } from '@/models/auth.js';
import Cookies from 'js-cookie';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const userLogin = createAsyncThunk(
  userServicesConfig.UserLogin, // es una referencia, es un nombre para la acción el nombre da igual, como si pongo patata
  async ({ email, password }: SignIn, { rejectWithValue }) => {
    try {
      const info = await axios.post(
        '/api/user/login',
        { email, password },
        config,
      );

      Cookies.set('userToken', btoa(info.data.data.userToken), {
        expires: 360000,
      });
      Cookies.set('userId', info.data.data._id, { expires: 360000 });

      return info.data.data;
    } catch (error: unknown) {
      return rejectWithValue(error); // paramos la peticion para que redux lo sepa
    }
  },
);

export const userRegister = createAsyncThunk(
  userServicesConfig.UserRegister,
  async ({ firstName, email, password }: SignUp, { rejectWithValue }) => {
    try {
      await axios.post(
        '/api/user/register',
        { firstName, email, password },
        config,
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message);
      }
    }
  },
);
