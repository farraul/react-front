import React, { useEffect, useState } from 'react';
import { createApi } from 'src/utilities';
import {
  STAR_WARS_ACCEPTED_RESOURCES,
  POKE_API_ACCEPTED_RESOURCES,
} from 'src/models/resourcesPublic';
import { API_URL_POKE, API_URL_STAR_WARS } from 'src/constants/API';

const ProxyPage = () => {
  const [charactersStarWars, setCharactersStarWars] = useState({}) as any;
  const [charactersPoke, setCharactersPoke] = useState({}) as any;

  const fetchCharacters = async () => {
    const starWarsApi = createApi(API_URL_STAR_WARS, STAR_WARS_ACCEPTED_RESOURCES);
    const pokeApi = createApi(API_URL_POKE, POKE_API_ACCEPTED_RESOURCES);
    const luke = await starWarsApi.people(1);
    const picachu = await pokeApi.pokemon(1);
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
