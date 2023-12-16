//I dont use now this

import { useQuery } from '@tanstack/react-query';

const useFetchTanstack = (
  url: string,
  name: string,
  refetchOnWindowFocus = true,
  cacheTime: number,
  staleTime: number,
) => {
  const getData = async () => {
    return fetch(url).then((res) => res.json());
  };

  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: [`${name}`],
    queryFn: getData,
    refetchOnWindowFocus,
    cacheTime,
    staleTime,
  });

  return { data, isLoading, error, isError, status };
};

export default useFetchTanstack;
