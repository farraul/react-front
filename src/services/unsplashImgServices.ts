const Access_Key = 'kxI2lJQw6qd4eUQ82U9U6VenIDxnTAD2d7fVYWvdtaU';

const fetchRequest = async (img: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`,
    );

    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }

    const data = await response.json();
   return data.results;

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

export default fetchRequest;
