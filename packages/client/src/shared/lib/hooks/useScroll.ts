import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// ['/', '/about' ...]
const useScroll = (routes: string[]): void => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathIndex = routes.findIndex((route) => route === pathname);

  const [scrollState, setScrollState] = useState(0);
  const maxScrollValue = 75;

  console.log(scrollState);

  const canNavigateNext =
    scrollState === maxScrollValue &&
    pathIndex !== -1 &&
    Boolean(routes[pathIndex + 1]);
  const canNavigatePrev =
    scrollState === 0 && pathIndex !== -1 && pathIndex !== 0;

  document.documentElement.style.setProperty('--scroll', `${scrollState}`);

  const handleScroll = useCallback(
    (event: WheelEvent): void => {
      // scroll down
      if (event.deltaY >= 0 && scrollState !== maxScrollValue) {
        setScrollState(scrollState + 1);

        return;
      }
      if (event.deltaY >= 0 && canNavigateNext) {
        navigate(routes[pathIndex + 1]);
        setScrollState(0);

        return;
      }

      // scroll up
      if (event.deltaY <= 0 && scrollState !== 0) {
        setScrollState(scrollState - 1);

        return;
      }
      if (event.deltaY <= 0 && canNavigatePrev) {
        navigate(routes[pathIndex - 1]);
        setScrollState(maxScrollValue);
      }
    },
    [routes, pathIndex],
  );

  useEffect(() => {
    document.addEventListener('wheel', handleScroll);

    return () => {
      document.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll]);
};

export default useScroll;
