import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const CallApi = () => {
  const [ricky, setRicky] = useState([]);

  const getRicky = async () => {
    return fetch('https://rickandmortyapi.com/api/character').then(
      (res) => res.json(),
    );
  };

  const {
    data: rickystate,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ['apiMorty'],
    queryFn: getRicky,
    //refetchOnWindowFocus: true,
    cacheTime: 10000, //tiempo almacenamiento en cache
    staleTime: 10000, //determina cuando tienen que actualizarse
  });

  useEffect(() => {
    if (rickystate) {
      setRicky(rickystate.results);
    }
  }, [rickystate]);

  return (
    <section className="p-16">
      <div className="w-2/3">
        <h1 className="text-3xl">
          Página para ver funcionamiento de una llamada con: useQuery
          de @tanstack/react-query{' '}
        </h1>
        <div className="mt-10">
          {/* {!isLoading && ricky.map(el => (
                        <p>{el.name}</p>
                    ))} */}
        </div>
      </div>
    </section>
  );
};

export default CallApi;
