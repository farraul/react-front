import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { userRegister, signIn } from './userActions';
import Cookies from 'js-cookie';
import { User, UserInfo } from 'src/models/user/user';

const token = Cookies.get('jwt_access_token') || '';
const infoDefault = { _id: '', firstName: '', email: '' };
const tokenDefault = '';

const initialState: User = {
  loading: false,
  userInfo: { ...infoDefault, token },
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('jwt_access_token');
      Cookies.remove('userId');
      state.loading = false;
      state.userInfo = { ...infoDefault, token: tokenDefault };
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    // builder
    //   .addCase(signIn.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
    //     state.loading = false;
    //     state.userInfo = action.payload as unknown as UserInfo;
    //   })
    //   .addCase(signIn.rejected, (state, { payload }) => {
    //     state.loading = false;
    //     state.error = payload as string;
    //   })
    // register user
    // .addCase(userRegister.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(userRegister.fulfilled, (state) => {
    //   state.loading = false;
    //   state.success = true;
    // })
    // .addCase(userRegister.rejected, (state, { payload }) => {
    //   state.loading = false;
    //   state.error = payload as string;
    // });
  },
});

export const { logout, setCredentials } = userSlice.actions;

export default userSlice.reducer;
