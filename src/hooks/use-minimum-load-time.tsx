import * as React from 'react';

const MINIMUM_LOAD_TIME = 500;

type UseMinimumLoadTimeProps = {
  minimumLoadTime?: number;
};

export function useMinimumLoadTime(props?: UseMinimumLoadTimeProps) {
  const { minimumLoadTime = MINIMUM_LOAD_TIME } = props ?? {};

  const [loadingDisplay, setLoadingDisplay] = React.useState(false);

  const loadingActualRef = React.useRef(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => clearTimeoutRef();
  }, []);

  function trySetLoading(newLoading: boolean) {
    loadingActualRef.current = newLoading;
    newLoading ? trySetLoadingTrue() : trySetLoadingFalse();
  }

  function trySetLoadingTrue() {
    clearTimeoutRef();
    setLoadingDisplay(true);
    timeoutStopLoading();
  }

  function trySetLoadingFalse() {
    if (!timeoutRef.current) {
      setLoadingDisplay(false);
    }
  }

  function timeoutStopLoading() {
    timeoutRef.current = setTimeout(() => {
      if (timeoutRef.current) {
        setLoadingDisplay(loadingActualRef.current);
        clearTimeoutRef();
      }
    }, minimumLoadTime);
  }

  function clearTimeoutRef() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  return {
    loading: loadingDisplay,
    setLoading: trySetLoading,
  };
}
