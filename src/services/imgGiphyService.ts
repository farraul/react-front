import { API_KEY_GIPHY, API_URL_GIPHY } from 'src/constants/API';
import { ApiResponse } from 'src/models/imgGiphy';
import { AddQueryByField } from 'src/utilities';

const baseApiGiphy = API_URL_GIPHY;

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
    api_key: API_KEY_GIPHY,
    q: img,
    limit,
    offset: page,
  })}&rating=g&lang=en&bundle=clips_grid_picker`;
  console.log({ ApiURL });
  return fetch(ApiURL)
    .then((res) => res.json())
    .then(fromAPIResponse);
};
