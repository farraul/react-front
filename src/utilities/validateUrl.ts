import { Regex } from 'src/constants/Regex';

export const validateUrl = (url: string) => {
  return Regex.URL.test(url);
};
