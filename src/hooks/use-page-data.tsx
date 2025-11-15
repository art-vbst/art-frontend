import * as React from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { ApiError, ServerError } from '~/api/errors';

const SKELETON_DELAY_MS = 150;

export function usePageData<T>(fetchData: () => Promise<AxiosResponse<T>>) {
  const [data, setData] = React.useState<T | null>(null);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [showSkeleton, setShowSkeleton] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const skeletonTimeout = window.setTimeout(() => {
      if (!cancelled) {
        setShowSkeleton(true);
      }
    }, SKELETON_DELAY_MS);

    async function performRequest() {
      try {
        const res = await fetchData();
        if (cancelled) return;
        setData(res.data);
      } catch (err: unknown) {
        if (!cancelled) {
          handleError(err);
        }
      } finally {
        if (cancelled) return;
        setHasLoaded(true);
        setShowSkeleton(false);
        window.clearTimeout(skeletonTimeout);
      }
    }

    void performRequest();

    return () => {
      cancelled = true;
      window.clearTimeout(skeletonTimeout);
    };
  }, []);

  const handleError = (err: unknown) => {
    if (err instanceof AxiosError) {
      throw ApiError.fromResponse(err);
    }

    throw new ServerError('an unknown error occurred');
  };

  const loading = !hasLoaded && showSkeleton;

  return { data, loading, hasLoaded };
}
