import { API_HOST_RAPID, API_KEY_RAPID, API_URL_RAPID } from 'src/constants/API';
import axios from 'axios';

export const getAnalyseUrlSeo = async (url: string) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('url', url);

  const options = {
    method: 'POST',
    url: API_URL_RAPID,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': API_KEY_RAPID,
      'X-RapidAPI-Host': API_HOST_RAPID,
    },
    data: encodedParams,
  };

  return await axios.request(options);
};
