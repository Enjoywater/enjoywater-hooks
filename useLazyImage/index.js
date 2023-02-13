import React, { useState } from 'react';

import useIntersection from './hooks/useIntersection';

const LazyImage = ({ src, alt, observerOptions }) => {
  const [loaded, setLoaded] = useState(false);

  const ref = useIntersection(({ target }, observer) => {
    if (loaded) return;

    const imageSrc = target.getAttribute('data-src');

    target.removeAttribute('data-src');
    target.setAttribute('src', imageSrc);

    observer.unobserve(target);
    setLoaded(true);
  }, observerOptions);

  return <img alt={alt} ref={ref} data-src={src} />;
};

export default LazyImage;
