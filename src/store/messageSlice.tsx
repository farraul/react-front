import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    autoHideDuration: 2000,
    message: 'Hi',
    variant: null,
  },
};
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        ...action.payload,
      };
    },
    showError: (state, action) => {
      state.state = true;
      state.options = {
        ...initialState.options,
        message: action.payload,
        autoHideDuration: 300000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        variant: 'error',
      };
    },
    hideMessage: (state, action) => {
      state.state = null;
    },
  },
});

export const { hideMessage, showMessage, showError } = messageSlice.actions;

export const selectAppMessageState = ({ app }: any) => app.message.state;

export const selectAppMessageOptions = ({ app }: any) => app.message.options;

export default messageSlice.reducer;
