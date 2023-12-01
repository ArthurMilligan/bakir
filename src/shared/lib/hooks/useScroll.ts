import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// ['/', '/about' ...]
const useScroll = (routes: string[]): void => {
  const [stopedHook, setStopedHook] = useState(false);
  const stopHook = (): void => {
    console.log('stopped');

    setStopedHook(true);
  };
  const startHook = (): void => {
    console.log('strted');

    setStopedHook(false);
  };

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathIndex = routes.findIndex((route) => route === pathname);

  const [scrollState, setScrollState] = useState(0);
  const maxScrollValue = 75;

  const canNavigateNext =
    scrollState === maxScrollValue && Boolean(routes[pathIndex + 1]);
  const canNavigatePrev = scrollState === 0 && pathIndex !== 0;

  document.documentElement.style.setProperty('--scroll', `${scrollState}`);

  const handleScroll = useCallback(
    (event: WheelEvent): void => {
      console.log('render');
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
    [scrollState, pathIndex],
  );

  useEffect(() => {
    if (pathIndex === -1) {
      stopHook();
    }
    if (pathIndex !== -1 && stopedHook) {
      startHook();
    }
    if (!stopedHook) {
      document.addEventListener('wheel', handleScroll);
    }

    return () => {
      document.removeEventListener('wheel', handleScroll);
    };
  }, [handleScroll, stopedHook]);
};

export default useScroll;
