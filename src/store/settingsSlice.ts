import { createTheme } from '@mui/material/styles';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appDark, appBlue } from 'src/colors';
import { changeThemeTailwind } from 'src/utilities/changeThemeTailwind';

export const defaultThemes = createTheme({
  palette: {
    primary: { ...appDark },
  },
});

export const otherThemes = createTheme({
  palette: {
    primary: { ...appBlue },
  },
});

const settingsEmptyState: any = {
  color: defaultThemes,
  mode: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsEmptyState,
  reducers: {
    changeTheme: (state, action) => {
      state.color = action.payload === 'light' ? defaultThemes : otherThemes;
      state.mode = action.payload;
      changeThemeTailwind(action.payload);
    },
  },
});

export const { changeTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
