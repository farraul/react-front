import { createSelector } from '@reduxjs/toolkit';
import es from 'date-fns/locale/es';
import en from 'date-fns/locale/en-GB';
import i18n from '../../i18n';

export const selectCurrentLanguageId = ({ i18n: _i18n }: { i18n: any; _i18n: any }) =>
  _i18n.language;

export const selectCurrentDateFnsLocale = ({ i18n: _i18n }: { i18n: any; _i18n: any }) => {
  const localeObject: any = {
    es,
    en,
  };
  return localeObject[_i18n.language];
};

export const selectLanguages = ({ i18n: _i18n }: { i18n: any; _i18n: any }) => _i18n.languages;

export const selectCurrentLanguageDirection = createSelector([selectCurrentLanguageId], (id) => {
  return i18n.dir(id);
});

export const selectCurrentLanguage = createSelector(
  [selectCurrentLanguageId, selectLanguages],
  (id, languages) => {
    return languages.find((lng: any) => lng.id === id);
  },
);
