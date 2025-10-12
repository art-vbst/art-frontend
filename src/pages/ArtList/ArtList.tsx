import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtCard, Spinner } from '~/components';
import { Artwork, ArtworkModel } from '~/api';

export const ArtList = () => {
  const [artworks, setArtworks] = React.useState<Artwork[]>([]);
  const [loading, setLoading] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    setLoading(true);
    ArtworkModel.list({ status: ['available', 'coming_soon'] })
      .then((res) => setArtworks(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderArtwork = (artwork: Artwork) => {
    return (
      <div key={artwork.id} className="group">
        <ArtCard artwork={artwork} onClick={() => navigate(`/art/${artwork.id}`)} />
      </div>
    );
  };

  return (
    <div className="max-w-[1020px] mx-auto flex gap-32 px-8 pb-[100px] max-[1020px]:gap-16 max-[720px]:flex-col max-[720px]:px-4 max-[720px]:pb-8 max-[720px]:gap-8">
      {loading ? (
        <div className="flex justify-center items-center w-full pt-8">
          <Spinner />
        </div>
      ) : artworks.length > 0 ? (
        <>
          <div className="flex-1 flex flex-col gap-24 max-[1020px]:gap-8">
            {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
          </div>
          <div className="flex-1 flex flex-col gap-24 max-[1020px]:gap-8">
            {artworks.filter((_, i) => i % 2 === 1).map(renderArtwork)}
          </div>
        </>
      ) : (
        <div className="flex-1 flex justify-center items-center mt-[100px]">
          <p className="text-base text-gray-light italic">No paintings found</p>
        </div>
      )}
    </div>
  );
};
