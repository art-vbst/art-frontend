import { ArtworkModel } from '~/api/models';
import { usePageData } from '~/hooks/use-page-data';
import { useValidatedId } from '~/hooks/use-validated-id';
import { NotFound } from '~/pages/general/NotFound';
import { Spinner } from '~/components/Spinner/Spinner';
import { ArtDetailContent } from './components/Content';

export default function ArtDetail() {
  const artworkId = useValidatedId();

  if (!artworkId) {
    return <NotFound />;
  }

  const { data: artwork, loading } = usePageData(() => ArtworkModel.get(artworkId));

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center pt-8">
        <Spinner />
      </div>
    );
  }

  if (!artwork) {
    return <NotFound />;
  }

  return <ArtDetailContent artwork={artwork} />;
}
