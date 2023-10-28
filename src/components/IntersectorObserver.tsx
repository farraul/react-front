import React, { useEffect, useRef } from 'react';

interface IntersectionObserverProps {
  element: string;
  onIntersection: (entries: IntersectionObserverEntry[]) => void;
  options: IntersectionObserverInit;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchObserverData: Promise<void>;
}

export const IntersectionObserverComponent: React.FC<IntersectionObserverProps> = ({
  element,
  onIntersection,
  options,
  page,
  setPage,
  fetchObserverData,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      console.log({ page });
      setPage((page) => page + 1);
      console.log({ page });

      await fetchObserverData(page);
      return;
    }
  };

  useEffect(() => {
    const targetElement = document.getElementById(`${element}`);

    if (targetElement) {
      console.log({ targetElement });
      observerRef.current = new IntersectionObserver(handleIntersection, options);
      observerRef.current.observe(targetElement);
      console.log({ observerRef });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [observerRef, options]);

  return null;
};
