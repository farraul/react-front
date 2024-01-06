import { ChangeEvent } from 'react';
import { useAppDispatch } from 'src/hooks/useApp';
import { changeLanguage } from 'src/store/i18n/i18nSlice';
import { useSelector } from 'react-redux';
import React from 'react';
import { Select } from '../PrimitiveElements';
import { selectCurrentLanguage } from 'src/store/i18n/i18Selectors';

const languageValues = {
  es: 'Es',
  en: 'En',
};

export const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <Select
      id='language'
      name='languaje'
      values={currentLanguage.id}
      onChange={handleChangeLanguage}
      placeholder=''
      options={languageValues}
    />
  );
};
