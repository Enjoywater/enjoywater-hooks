import { useRef, useEffect, useCallback } from 'react';

const useIntersection = (onIntersect, options) => {
  const ref = useRef(null);

  const callback = useCallback(
    (entries, observer) => entries.forEach((entry) => entry.isIntersecting && onIntersect(entry, observer)),
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersection;
