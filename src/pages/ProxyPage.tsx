import React, { useEffect, useState } from 'react';
import {
  POKE_API_ACCEPTED_RESOURCES,
  POKE_API_URL,
  STAR_WARS_ACCEPTED_RESORUCES,
  STAR_WARS_API_URL,
} from 'src/constants/API';
import { createApi } from 'src/utilities';

const ProxyPage = () => {
  const [charactersStarWars, setCharactersStarWars] = useState(null) as any;
  const [charactersPoke, setCharactersPoke] = useState(null) as any;

  const callApis = async () => {
    const starWarsApi = createApi(STAR_WARS_API_URL, STAR_WARS_ACCEPTED_RESORUCES);
    const pokeApi = createApi(POKE_API_URL, POKE_API_ACCEPTED_RESOURCES);
    const luke = await starWarsApi.people(1);
    const picachu = await pokeApi.pokemon(1);

    setCharactersStarWars(luke);
    setCharactersPoke(picachu);
  };

  useEffect(() => {
    console.log('1');
    callApis();
  }, []);

  return (
    <section className="p-16">
      <div>ProxyPage</div>
      <h2>Api Poke</h2>
      {charactersPoke?.name}

      <h2 className="mt-20">Api Star Wars</h2>
      {charactersStarWars?.name}
    </section>
  );
};

export default ProxyPage;
