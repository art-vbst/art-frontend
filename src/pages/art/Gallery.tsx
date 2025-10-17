import * as React from 'react';
import { ArtworkModel } from '~/api/models';
import { Artwork } from '~/api/types';
import { ArtCard } from '~/components/ArtCard/ArtCard';
import { ArtViewer } from '~/components/ArtViewer/ArtViewer';
import { Spinner } from '~/components/Spinner/Spinner';

export const Gallery = () => {
  const [openArtwork, setOpenArtwork] = React.useState<Artwork | null>(null);
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    ArtworkModel.list()
      .then((res) => setArtworks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderArtwork = (artwork: Artwork) => {
    return (
      <ArtCard
        key={artwork.id}
        artwork={artwork}
        showInfo={false}
        onClick={() => setOpenArtwork(artwork)}
      />
    );
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      {loading ? (
        <div className="flex justify-center pt-8">
          <Spinner />
        </div>
      ) : artworks.length > 0 ? (
        <>
          <div className="flex flex-col gap-16 md:flex-row">
            <div className="flex flex-1 flex-col gap-16">
              {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
            </div>
            <div className="flex flex-1 flex-col gap-16">
              {artworks.filter((_, i) => i % 2 === 1).map(renderArtwork)}
            </div>
          </div>
          <ArtViewer
            artwork={openArtwork}
            open={!!openArtwork}
            onClose={() => setOpenArtwork(null)}
          />
        </>
      ) : (
        <div className="mt-24 flex items-center justify-center">
          <p className="text-gray-light italic">No paintings found</p>
        </div>
      )}
    </div>
  );
};
