import React, { useState, useEffect } from 'react';
import getImages from '@/services/unsplashImgServices';
import { useDebounce } from 'use-debounce';

interface ImageData {
  urls: {
    small: string;
  };
}

function Images() {
  const [img, setImg] = useState('');
  const [res, setRes] = useState<ImageData[]>([]);

  const [debouncedImg] = useDebounce(img, 3000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImages(debouncedImg);
        setRes(data);
      } catch (error) {
        console.error('Error al obtener datos', error);
      }
    };

    fetchData();
  }, [debouncedImg]);

  const handleChange = (event: any) => {
    const inputValue = event.target.value;
    setImg(inputValue);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="p-36 pb-20 font-bold text-5xl text-center">Images</div>
        <input
          className="col-3 w-96 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark text-center"
          type="text"
          placeholder="Escribe lo que quieras buscar..."
          value={img}
          onChange={handleChange}
        />
        <div className=" d-flex flex-wrap justify-content-evenly flex mt-20 w-full">
          {res.map((val) => {
            return (
              <>
                <div className="w-1/5 border-solid border-white border-2	">
                  <img
                    className="col-3 img-fluid img-thumbnail w-full"
                    src={val.urls.small}
                    alt="val.alt_description"
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Images;
