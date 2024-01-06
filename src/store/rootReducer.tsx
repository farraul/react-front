import { combineReducers } from '@reduxjs/toolkit';
import i18n from './i18n/i18nSlice';
import user from 'src/store/user/userSlice';
import messageSlice from './messageSlice';
import settings from './settingsSlice';

const createReducer = (asyncReducers?: any) => (state: any, action: any) => {
  const combinedReducer: any = combineReducers({
    settings,
    i18n,
    user,
    messageSlice,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createReducer;
