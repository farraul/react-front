import { createSelector, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import 'moment/locale/es';
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en-GB';
import i18n from '../i18n';

moment.locale(i18n.options.lng);

export const changeLanguage = (languageId) => (dispatch) => {
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

export const selectCurrentLanguageId = ({ i18n: _i18n }) => _i18n.language;

export const selectCurrentDateFnsLocale = ({ i18n: _i18n }) =>
  ({
    es,
    en,
  }[_i18n.language]);

export const selectLanguages = ({ i18n: _i18n }) => _i18n.languages;

export const selectCurrentLanguageDirection = createSelector([selectCurrentLanguageId], (id) => {
  return i18n.dir(id);
});

export const selectCurrentLanguage = createSelector(
  [selectCurrentLanguageId, selectLanguages],
  (id, languages) => {
    return languages.find((lng) => lng.id === id);
  },
);

export default i18nSlice.reducer;
