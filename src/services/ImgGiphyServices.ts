import { URL_GIPHY_API } from '@/constants';
import { ApiResponse } from '@/models/imgGiphy';
import { AddQueryByField } from '@/utilities';

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const baseApiGiphy = URL_GIPHY_API;

const fromAPIResponse = (apiResponse: ApiResponse) => {
  const { data = [] } = apiResponse;
  console.log({ apiResponse });

  if (Array.isArray(data)) {
    const gifs = data.map((image) => {
      const { title, id, images } = image;
      const url = images.fixed_width.url;
      return { title, id, url };
    });
    return gifs;
  }
  return [];
};

export const getImages = async (img: string, limit = 10, page = 0) => {
  const ApiURL = `${baseApiGiphy}/gifs/search${AddQueryByField({
    api_key: API_KEY,
    q: img,
    limit,
    offset: page,
  })}&rating=g&lang=en&bundle=clips_grid_picker`;
  console.log({ ApiURL });
  return fetch(ApiURL)
    .then((res) => res.json())
    .then(fromAPIResponse);
};
