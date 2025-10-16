import * as React from 'react';

export const useResizeListener = (
  mediaQuery: string,
  callback: (queryMatches: boolean) => void,
) => {
  React.useEffect(() => {
    const query = window.matchMedia(mediaQuery);

    const handleChange = (e: MediaQueryListEvent) => {
      callback(e.matches);
    };

    callback(query.matches);

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, [mediaQuery, callback]);
};
