import React, { useEffect, useRef } from 'react';

interface IntersectionObserverProps {
  element: string;
  onIntersection: (entries: IntersectionObserverEntry[]) => void;
  options: IntersectionObserverInit;
  shouldObserve: Boolean

}

export const IntersectionObserverComponent: React.FC<IntersectionObserverProps> = ({
  element,
  onIntersection,
  options,
  shouldObserve,

}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targetElement = document.getElementById(`${element}`);

    if (targetElement && shouldObserve) {
      observerRef.current = new IntersectionObserver(onIntersection, options);
      observerRef.current.observe(targetElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onIntersection, options, shouldObserve]);

  return null;
};
