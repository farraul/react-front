import { URL_RAPID_API } from 'src/constants/API';
import axios from 'axios';

export const getAnalyseUrlSeo = async (url: string) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('url', url);

  const options = {
    method: 'POST',
    url: URL_RAPID_API,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': import.meta.env.VITE_APP_API_KEY_RAPIDAPI,
      'X-RapidAPI-Host': import.meta.env.VITE_APP_API_HOST_RAPIDAPI,
    },
    data: encodedParams,
  };

  return await axios.request(options);
};
