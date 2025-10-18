import { ArtworkModel } from '~/api/models';
import { usePageData } from '~/hooks/use-page-data';
import { useValidatedId } from '~/hooks/use-validated-id';
import { NotFound } from '~/pages/general/NotFound';
import { Spinner } from '~/components/Spinner/Spinner';
import { ArtDetailContent } from './ArtDetailContent';

export default function ArtDetail() {
  const artworkId = useValidatedId();

  if (!artworkId) {
    return <NotFound />;
  }

  const { data, loading } = usePageData(() => ArtworkModel.get(artworkId));

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center pt-8">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <NotFound />;
  }

  return <ArtDetailContent artwork={data} />;
}
