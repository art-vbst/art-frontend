import * as React from 'react';

export const useResizeListener = (mediaQuery: string) => {
  const [queryMatches, setQueryMatches] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia(mediaQuery);

    const handleChange = (e: MediaQueryListEvent) => {
      setQueryMatches(e.matches);
    };

    setQueryMatches(query.matches);

    query.addEventListener('change', handleChange);

    return () => {
      query.removeEventListener('change', handleChange);
    };
  }, [mediaQuery]);

  return queryMatches;
};
