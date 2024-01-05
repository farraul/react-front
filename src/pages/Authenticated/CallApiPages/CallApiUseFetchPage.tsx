import { useFetch } from 'src/hooks/useFetch';
import React from 'react';
import { API_URL_RICK_AND_MORTY } from 'src/constants/API';

const CallApiUseFetch = () => {
  const { data, loading, error, handleCancelRequest } = useFetch(API_URL_RICK_AND_MORTY);

  return (
    <section className='p-16'>
      <div className='w-2/3'>
        <h1 className='text-3xl'>Página para ver funcionamiento de una llamada con: useFetch</h1>
        <div className='mt-10'>
          <button onClick={handleCancelRequest}>Cancel Request</button>
          <ul className='card'>
            {error && <li>Error: {error}</li>}
            {loading && <li>Loading...</li>}

            {data?.results.map((item: { name: string }, index: React.Key) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CallApiUseFetch;
