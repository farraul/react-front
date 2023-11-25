import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userRegister, userLogin } from './userActions';
import Cookies from 'js-cookie';
import { User, UserInfo } from 'src/models/user/user';

const userToken = atob(Cookies.get('userToken') || '');
const userInfoDefault = { _id: '', firstName: '', email: '' };
const userTokenDefault = '';

const initialState: User = {
  loading: false,
  userInfo: { ...userInfoDefault, userToken },
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('userToken');
      Cookies.remove('userId');
      state.loading = false;
      state.userInfo = { ...userInfoDefault, userToken: userTokenDefault };
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
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
        state.userInfo = action.payload as unknown as UserInfo;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
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
