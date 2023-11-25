import React, { useEffect, useState } from 'react';
import { createApi } from 'src/utilities';
import {
  STAR_WARS_ACCEPTED_RESOURCES,
  POKE_API_ACCEPTED_RESOURCES,
} from 'src/models/resourcesPublic';
import { API_URL_POKE, API_URL_STAR_WARS } from 'src/constants/API';

interface Resources {
  [index: string]: string;
}

export interface StarWarsResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

interface ApiResponse<T> {
  data: T;
  error?: string;
}

const ProxyPage = () => {
  const [charactersStarWars, setCharactersStarWars] = useState({}) as any;
  const [charactersPoke, setCharactersPoke] = useState({}) as any;

  const fetchCharacters = async () => {
    const starWarsApi = createApi(
      API_URL_STAR_WARS,
      STAR_WARS_ACCEPTED_RESOURCES as unknown as Resources,
    );
    const pokeApi = createApi(API_URL_POKE, POKE_API_ACCEPTED_RESOURCES);

    const luke: ApiResponse<StarWarsResponse> = await starWarsApi.people(1);

    const picachu: ApiResponse<T> = await pokeApi.pokemon(1);

    setCharactersStarWars(luke);
    setCharactersPoke(picachu);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <section className='p-16'>
      <div>ProxyPage</div>
      <h2>Api Poke</h2>
      {charactersPoke?.name}

      <h2 className='mt-20'>Api Star Wars</h2>
      {charactersStarWars?.name}
    </section>
  );
};

export default ProxyPage;
