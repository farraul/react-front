import { instance } from './axios';

export const getMe = async (userToken: string) => {
  // debugger
  return await instance({
    method: 'GET',
    url: 'api/user/profile',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export const getUrlsSeo = async (id: string) => {
  return await instance({
    method: 'GET',
    url: `/api/user/seo/${id}`,
  });
};

export const createUrlsSeo = async (id: string, urlSeo: string) => {
  return await instance({
    method: 'POST',
    url: `api/user/seo/`,
    data: { id , urlSeo },
  });
};

// export const getProductsRequest = async (id: string): Promise<Product[]> => {
//   const response = await axios.get(`/api/user/products/${id}`);
//   return response.data;
// };

// export const getAnalyseUrlSeo = async (url: string) => {
//   const encodedParams = new URLSearchParams();
//   encodedParams.set('url', url);

//   const options = {
//     method: 'POST',
//     url: 'https://canssens-seo-extraction-v1.p.rapidapi.com/seo/api/',
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'X-RapidAPI-Key': import.meta.env.VITE_APP_API_KEY_RAPIDAPI,
//       'X-RapidAPI-Host': import.meta.env.VITE_APP_API_HOST_RAPIDAPI,
//     },
//     data: encodedParams,
//   };

//   return await axios.request(options);}
