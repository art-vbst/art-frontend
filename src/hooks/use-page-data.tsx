import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMinimumLoadTime } from './use-minimum-load-time';
import { ApiError, ServerError } from '~/api/errors';

export function usePageData<T>(fetchData: () => Promise<AxiosResponse<T>>) {
  const [data, setData] = React.useState<T | null>(null);

  const { isLoading, setIsLoading } = useMinimumLoadTime();

  React.useEffect(() => {
    performRequest();
  }, []);

  async function performRequest() {
    try {
      setIsLoading(true);
      const res = await fetchData();
      setData(res.data);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      throw ApiError.fromResponse(err);
    }

    throw new ServerError('an unknown error occurred');
  };

  return { data, loading: isLoading };
}
