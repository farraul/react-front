import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import history from 'src/history';
// import { setInitialSettings } from 'app/store/app/settingsSlice';
// import settingsConfig from 'app/configs/settingsConfig';

export const setUser = createAsyncThunk('user/setUser', async (user, { dispatch, getState }) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */
  if (user.loginRedirectUrl) {
    // settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'home'
  }

  return user;
});

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState();

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  // dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

const initialState = {
  name: '',
  role: null,
  loginOrEmail: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [setUser.fulfilled]: (state, action) => action.payload,
  },
});

export const { userLoggedOut } = userSlice.actions;

export const selectUser = ({ user }) => user;

export default userSlice.reducer;
