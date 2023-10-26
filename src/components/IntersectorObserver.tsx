import React, { useEffect, useRef } from 'react';

interface IntersectionObserverProps {
  element: string;
  onIntersection: (entries: IntersectionObserverEntry[]) => void;
  options: IntersectionObserverInit;
}

export const IntersectionObserverComponent: React.FC<IntersectionObserverProps> = ({
  element,
  onIntersection,
  options,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const targetElement = document.getElementById(`${element}`);

    if (targetElement) {
      console.log({ targetElement });
      observerRef.current = new IntersectionObserver(onIntersection, options);
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
