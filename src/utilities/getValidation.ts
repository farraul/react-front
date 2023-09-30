/* eslint-disable prettier/prettier */

import { TypeWithKey } from '@/models/typeWithKey';

export const getValidationError = (errorCode: string) => {
  const codeMatcher: TypeWithKey<string> = {
    'Invalid email or password': 'Email o contraseña incorrectas',
    ERR_BAD_REQUEST: 'Request failed with status code 401',
    'Request failed with status code 401':
      'Request failed with status code 401',
    ERR_403: 'Error 403',
    ERR_404: 'Error 404 de interceptor',
  };
  return codeMatcher[errorCode];
};

export const getValidationSucces = (successCode: string) => {
  const codeMatcher: TypeWithKey<string> = {
    '/api/user/login': 'Te has logueado super bien',
    '/api/user/products/6496c27c686d5ffb6cd69c8a':
      'Productos descargados',
  };
  // console.log(codeMatcher[successCode] === undefined)
  //   if (codeMatcher[successCode] === undefined) return;
  return codeMatcher[successCode];
};
