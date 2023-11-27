import { fetchData } from 'src/utilities/fetchDataPro';
import React, { Suspense } from 'react';
import { API_URL_RICK_AND_MORTY } from 'src/constants/API';

//revisar
const apiData = fetchData(API_URL_RICK_AND_MORTY);

const CallApiPro = () => {
  const data = apiData.read();
  console.log({ data });

  return (
    <section className='p-16'>
      <div className='w-2/3'>
        <h1 className='text-3xl'>
          Página para ver funcionamiento de una llamada a una API de una manera Pro
        </h1>
        <div className='mt-10'>
          <Suspense fallback={<div>Loading...</div>}>
            <ul className='card'>
              {data?.results.map((item: any, index: any) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default CallApiPro;
