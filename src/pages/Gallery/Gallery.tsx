import * as React from 'react';
import { ArtCard, ArtViewer, Spinner } from '~/components';
import { Artwork, ArtworkModel } from '~/api';

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
    <div className="max-w-7xl mx-auto p-8">
      {loading ? (
        <div className="flex justify-center pt-8">
          <Spinner />
        </div>
      ) : artworks.length > 0 ? (
        <>
          <div className="flex gap-16 md:flex-row flex-col">
            <div className="flex-1 flex flex-col gap-16">
              {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
            </div>
            <div className="flex-1 flex flex-col gap-16">
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
        <div className="flex justify-center items-center mt-24">
          <p className="text-gray-light italic">No paintings found</p>
        </div>
      )}
    </div>
  );
};
