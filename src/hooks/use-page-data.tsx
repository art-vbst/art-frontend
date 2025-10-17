import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMinimumLoadTime } from './use-minimum-load-time';
import { ApiError, ServerError } from '~/api/errors';

type PageDataConfig = {
  minimumLoadTime?: number;
};

export function usePageData<T>(
  fetchData: () => Promise<AxiosResponse<T>>,
  config?: PageDataConfig,
) {
  const [data, setData] = React.useState<T | null>(null);
  const [localLoading, setLocalLoading] = React.useState(true);

  const { isLoading, setIsLoading } = useMinimumLoadTime({
    done: !localLoading,
    minimumLoadTime: config?.minimumLoadTime,
  });

  React.useEffect(() => {
    performRequest();
  }, []);

  React.useEffect(() => {
    setIsLoading(localLoading);
  }, [localLoading, setIsLoading]);

  async function performRequest() {
    try {
      const res = await fetchData();
      setData(res.data);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLocalLoading(false);
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
