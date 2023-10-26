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
  const [isLoading, setIsLoading] = useState(false); //spiner

  const [debouncedImg] = useDebounce(nameSearch, 3000);

  const fetchSearchData = async () => {
    try {
      setIsLoading(true);
      const data = await getImages(debouncedImg, 8, page);
      setImages(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener datos', error);
      setIsLoading(false);
    }
  };

  const fetchObserverData = async (pagedata) => {
    try {
      setIsLoading(true);
      const data = await getImages(debouncedImg, 8, pagedata);
      console.log({ page });
      setImages((prev) => [...prev, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener datos', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedImg) {
      const data = async () => {
        await fetchSearchData();
      };
      data();
    }
  }, [debouncedImg]);

  const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setPage(page + 1);
      await fetchObserverData(page);
      return;
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
        </div>
        <div id="observer-target" style={{ height: '5px' }}></div>
      </div>
      {images.length > 0 && (
        <IntersectionObserverComponent
          element="observer-target"
          onIntersection={handleIntersection}
          options={IntersectionObserverOptions}
        />
      )}
    </>
  );
};

export default Images;
