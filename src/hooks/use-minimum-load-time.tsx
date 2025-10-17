import * as React from 'react';

const MINIMUM_LOAD_TIME = 300;

type UseMinimumLoadTimeProps = {
  done: boolean;
  minimumLoadTime?: number;
};

export function useMinimumLoadTime({
  done,
  minimumLoadTime = MINIMUM_LOAD_TIME,
}: UseMinimumLoadTimeProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneRef = React.useRef(done);

  React.useEffect(() => {
    doneRef.current = done;
  }, [done]);

  React.useEffect(() => {
    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, []);

  function trySetLoading(loading: boolean) {
    if (!loading && !timeoutRef.current) {
      return;
    }

    if (!loading) {
      setIsLoading(false);
      return;
    }

    timeoutRef.current && clearTimeout(timeoutRef.current);
    setIsLoading(true);
    debounceStopLoading();
  }

  function debounceStopLoading() {
    timeoutRef.current = setTimeout(() => {
      doneRef.current && setIsLoading(false);
    }, minimumLoadTime);
  }

  return { isLoading, setIsLoading: trySetLoading };
}
