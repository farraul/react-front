import { regexUrl } from './regex';

export const validateUrl = (url: string) => {
  return regexUrl.test(url);
};
