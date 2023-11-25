import React, { useState, useEffect, useRef } from 'react';
import { getImages } from 'src/services';
import { useDebounce } from 'use-debounce';

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

const ImagesPage = () => {
  const [nameSearch, setNameSearch] = useState('');
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedImg] = useDebounce(nameSearch, 3000);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length) {
      const targetElement = document.getElementById('observer-target');

      if (targetElement) {
        console.log({ targetElement });
        observerRef.current = new IntersectionObserver(
          handleIntersection,
          IntersectionObserverOptions,
        );
        observerRef.current.observe(targetElement);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, [page]);

  const fetchImageData = async (page: number) => {
    try {
      setIsLoading(true);
      const data = await getImages(debouncedImg, 8, page);
      setPage((page) => page + 1);
      setImages((prev) => [...prev, ...data]);
    } catch (error) {
      console.error('Error al obtener datos', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedImg) {
      const data = async () => {
        await fetchImageData(page);
      };
      data();
    }
  }, [debouncedImg]);

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current = new IntersectionObserver(
        handleIntersection,
        IntersectionObserverOptions,
      );
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      await fetchImageData(page);
      return;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNameSearch(inputValue);
  };

  return (
    <>
      <div className='flex flex-col items-center'>
        <div className='p-36 pb-20 font-bold text-5xl text-center'>Images</div>
        <input
          className='col-3 w-96 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark text-center'
          type='text'
          placeholder='Escribe lo que quieras buscar...'
          value={nameSearch}
          onChange={handleChange}
        />
        {images.length ? (
          <div className='min-h-screen d-flex flex-wrap justify-content-evenly flex mt-20 w-full'>
            {images.map((val, index) => {
              return (
                <>
                  <div key={index} className='w-2/6 border-solid border-white border-2	'>
                    <img
                      className='col-3 img-fluid img-thumbnail w-full'
                      src={val.url}
                      alt='val.alt_description'
                    />
                  </div>
                </>
              );
            })}
          </div>
        ) : null}
        <div id='observer-target' style={{ height: '5px' }}></div>
      </div>
    </>
  );
};

export default ImagesPage;
