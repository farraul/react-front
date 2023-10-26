import React, { useState, useEffect, useRef } from 'react';
import { getImages } from '@/services/ImgGiphyServices';
import { useDebounce } from 'use-debounce';
import { IntersectionObserverComponent } from '@/components/IntersectorObserver';

interface ImageData {
  title: string;
  id: string;
  url: string;
}
const IntersectionObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const Images = () => {
  const [nameSearch, setNameSearch] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [intersection, setIntersection] = useState(false);
  const [a, setA] = useState(false);

  const [debouncedImg] = useDebounce(nameSearch, 3000);

  const fetchData = async () => {
    try {
      if (debouncedImg && !isLoading) {
        setIsLoading(true);
        console.log({ page });
        const data = await getImages(debouncedImg, 8, page);
        setImages((prevData) => [...prevData, ...data]);
        setA(true);
        setIntersection(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error al obtener datos', error);
      setIsLoading(false);
      setIntersection(true);
    }
  };

  useEffect(() => {
    if (debouncedImg) {
      fetchData();
    }
  }, [debouncedImg]);

  const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    console.log({ a });
    console.log({ page });
    console.log({ target });

    if (target.isIntersecting && debouncedImg && a) {
      console.log('fectttttt');
      // setPage((prevPage) => prevPage + 1);
      await fetchData();
    } else {
      setA(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNameSearch(inputValue);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="p-36 pb-20 font-bold text-5xl text-center">Images</div>
        <input
          className="col-3 w-96 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark text-center"
          type="text"
          placeholder="Escribe lo que quieras buscar..."
          value={nameSearch}
          onChange={handleChange}
        />
        <div className=" d-flex flex-wrap justify-content-evenly flex mt-20 w-full">
          {images.map((val, index) => {
            return (
              <>
                <div key={index} className="w-2/6 border-solid border-white border-2	">
                  <img
                    className="col-3 img-fluid img-thumbnail w-full"
                    src={val.url}
                    alt="val.alt_description"
                  />
                </div>
              </>
            );
          })}
          <div id="observer-target" style={{ height: '5px' }}></div>
        </div>
      </div>
      <IntersectionObserverComponent
        element="observer-target"
        onIntersection={handleIntersection}
        options={IntersectionObserverOptions}
        shouldObserve={intersection}
      />
    </>
  );
};

export default Images;
