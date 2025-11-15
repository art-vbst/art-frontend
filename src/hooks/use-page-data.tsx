import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMinimumLoadTime } from './use-minimum-load-time';
import { ApiError, ServerError } from '~/api/errors';

export function usePageData<T>(fetchData: () => Promise<AxiosResponse<T>>) {
  const [data, setData] = React.useState<T | null>(null);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const { loading, setLoading } = useMinimumLoadTime();

  React.useEffect(() => {
    void performRequest();
  }, []);

  async function performRequest() {
    try {
      setLoading(true);
      const res = await fetchData();
      setData(res.data);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setHasLoaded(true);
      setLoading(false);
    }
  }

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      throw ApiError.fromResponse(err);
    }

    throw new ServerError('an unknown error occurred');
  };

  const effectiveLoading = loading || !hasLoaded;

  return { data, loading: effectiveLoading, hasLoaded };
}
