import { ArtworkModel } from '~/api/models';
import { usePageData } from '~/hooks/use-page-data';
import { useValidatedId } from '~/hooks/use-validated-id';
import { NotFound } from '~/pages/general/NotFound';
import { ArtDetailSkeleton } from '~/components/Skeleton/ArtDetailSkeleton';
import { ArtDetailContent } from './ArtDetailContent';

export default function ArtDetail() {
  const artworkId = useValidatedId();

  if (!artworkId) {
    return <NotFound />;
  }

  const { data, loading, hasLoaded } = usePageData(() =>
    ArtworkModel.get(artworkId),
  );

  if (loading) {
    return <ArtDetailSkeleton />;
  }

  if (!hasLoaded) {
    return null;
  }

  if (!data) {
    return <NotFound />;
  }

  return <ArtDetailContent artwork={data} />;
}
