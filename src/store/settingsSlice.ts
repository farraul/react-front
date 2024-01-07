import { createSlice } from '@reduxjs/toolkit';
import { changeThemeTailwind } from 'src/utilities/changeThemeTailwind';

const settingsEmptyState: any = {
  mode: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsEmptyState,
  reducers: {
    changeTheme: (state, action) => {
      state.mode = action.payload;
      changeThemeTailwind(action.payload);
    },
  },
});

export const { changeTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
