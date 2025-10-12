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
    <div className="max-w-[1600px] mx-auto flex gap-24 px-12 pb-[50px] max-[1200px]:gap-12 max-[1020px]:gap-8 max-[1020px]:px-4 max-[1020px]:pb-8 max-[720px]:flex-col max-[480px]:gap-4">
      {loading ? (
        <div className="flex justify-center items-center w-full pt-8">
          <Spinner />
        </div>
      ) : artworks.length > 0 ? (
        <>
          <div className="flex-1 flex flex-col gap-16 max-[1200px]:gap-12 max-[1020px]:gap-8 max-[480px]:gap-4">
            {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
          </div>
          <div className="flex-1 flex flex-col gap-16 max-[1200px]:gap-12 max-[1020px]:gap-8 max-[480px]:gap-4">
            {artworks.filter((_, i) => i % 2 === 1).map(renderArtwork)}
          </div>
          <ArtViewer
            artwork={openArtwork}
            open={!!openArtwork}
            onClose={() => setOpenArtwork(null)}
          />
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center mt-[100px]">
          <p className="text-base text-gray-light italic">No paintings found</p>
        </div>
      )}
    </div>
  );
};
