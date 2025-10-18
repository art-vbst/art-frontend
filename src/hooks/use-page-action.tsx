import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError, ServerError } from '~/api/errors';

export function usePageAction<T>(
  action: () => Promise<AxiosResponse<T>>,
  sideEffect?: (data: T) => void,
) {
  const [loading, setLoading] = React.useState(false);

  async function execute() {
    try {
      setLoading(true);
      const res = await action();
      sideEffect?.(res.data);
    } catch (err: unknown) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      throw ApiError.fromResponse(err);
    }

    throw new ServerError('an unknown error occurred');
  };

  return { execute, loading };
}
