import { useFetch } from '@/hooks/useFetch';
import React from 'react';
import { Ricky } from './CallApiTanStack';

const CallApi = () => {
  const response = useFetch('https://rickandmortyapi.com/api/character');

  const { loading, error, handleCancelRequest } = response;
  const data = response.data.results as Ricky[];

  return (
    <section className="p-16">
      <div className="w-2/3">
        <h1 className="text-3xl">
          Página para ver funcionamiento de una llamada con: useQuery de @tanstack/react-query{' '}
        </h1>
        <div className="mt-10">
          {loading && data.map((element, index) => <p key={index}>{element.name}</p>)}
        </div>
      </div>
    </section>
  );
};

export default CallApi;
