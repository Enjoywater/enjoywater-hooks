import { useEffect, useCallback } from 'react';

const useKeepScroll = (scrollRef) => {
  const setScroll = useCallback(() => {
    if (!scrollRef.current) return;

    sessionStorage.setItem('scrollY', `${scrollRef.current.scrollTop}`);
  }, [scrollRef]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollValue = sessionStorage.getItem('scrollY');

    if (scrollValue) scrollRef.current.scrollTop = +scrollValue;

    const handleRefresh = () => sessionStorage.removeItem('scrollY');
    window.addEventListener('beforeunload', handleRefresh);

    return () => window.removeEventListener('beforeunload', handleRefresh);
  }, [scrollRef]);

  return setScroll;
};

export default useKeepScroll;
