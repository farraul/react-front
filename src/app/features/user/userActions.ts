/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {AxiosError} from "axios";
import axios from "../../../api/axios.js"
import { userServicesConfig } from '@/services';
import { SignIn, SignUp } from '@/models/auth.js';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const userLogin = createAsyncThunk(
  userServicesConfig.UserLogin,  // es una referencia, es un nombre para la acción el nombre da igual, como si pongo patata
  async ({ email, password }: SignIn, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config,
      );
      localStorage.setItem('userToken', data.userToken);
      localStorage.setItem('userId', data._id);

      return data;
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
