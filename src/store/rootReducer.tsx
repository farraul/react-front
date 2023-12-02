import { combineReducers } from '@reduxjs/toolkit';
import i18n from './i18n/i18nSlice';
import user from 'src/store/user/userSlice';

const createReducer = (asyncReducers?: any) => (state: any, action: any) => {
  const combinedReducer: any = combineReducers({
    i18n,
    user,
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
