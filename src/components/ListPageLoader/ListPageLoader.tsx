import { AxiosResponse } from 'axios';
import { usePageData } from '~/hooks/use-page-data';

type ListPageLoaderProps<T> = {
  fetchData: () => Promise<AxiosResponse<T>>;
  children: (data: T) => React.ReactNode;
  emptyMessage?: string;
  loadingSkeleton?: React.ReactNode;
};

export function ListPageLoader<T extends any[] | null>({
  fetchData,
  children,
  emptyMessage = 'No items found',
  loadingSkeleton,
}: ListPageLoaderProps<T>) {
  const { data, loading } = usePageData<T>(() => fetchData());

  if (loading) {
    return <>{loadingSkeleton}</>;
  }

  if (!data || !data.length) {
    return (
      <p className="text-gray-light mt-16 self-center italic">{emptyMessage}</p>
    );
  }

  return children(data);
}
