import { createSelector, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import 'moment/locale/es';

import i18n from '../../i18n';

moment.locale(i18n.options.lng);

export const changeLanguage = (languageId: any) => (dispatch: any) => {
  moment.locale(languageId);

  return i18n.changeLanguage(languageId).then(() => {
    dispatch(i18nSlice.actions.languageChanged(languageId));
  });
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    language: i18n.options.lng,
    languages: [
      { id: 'es', name: 'esES', title: 'Español', flag: 'ES' },
      { id: 'en', name: 'enUS', title: 'English', flag: 'EN' },
    ],
  },
  reducers: {
    languageChanged: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default i18nSlice.reducer;
