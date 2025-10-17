import { AxiosResponse } from 'axios';
import { Spinner } from '../Spinner/Spinner';
import { usePageData } from '~/hooks/use-page-data';

type ListPageLoaderProps<T> = {
  fetchData: () => Promise<AxiosResponse<T>>;
  children: (data: T) => React.ReactNode;
  emptyMessage?: string;
};

export function ListPageLoader<T extends any[] | null>({
  fetchData,
  children,
  emptyMessage = 'No items found',
}: ListPageLoaderProps<T>) {
  const { data, loading } = usePageData<T>(() => fetchData());

  if (loading) {
    return (
      <div className="flex justify-center pt-8">
        <Spinner />
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <p className="text-gray-light mt-16 self-center italic">{emptyMessage}</p>
    );
  }

  return children(data);
}
