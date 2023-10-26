const API_KEY = 'DdFsCW4NGU12FCzFZsfAHcULi7lSvnvK';

const fromAPIResponse = (apiResponse: any) => {
  const { data = [] } = apiResponse;
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

export const getImages = async (img: any, limit = 10, page=0) => {
  const ApiURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${img}&limit=${limit}&offset=${page}&rating=g&lang=en&bundle=clips_grid_picker`;

  return fetch(ApiURL)
    .then((res) => res.json())
    .then(fromAPIResponse);
};
