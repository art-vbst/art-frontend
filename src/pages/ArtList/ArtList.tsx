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
    <div className="max-w-5xl mx-auto p-8 pb-24">
      {loading ? (
        <div className="flex justify-center pt-8">
          <Spinner />
        </div>
      ) : artworks.length > 0 ? (
        <div className="flex gap-16 md:flex-row flex-col">
          <div className="flex-1 flex flex-col gap-16">
            {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
          </div>
          <div className="flex-1 flex flex-col gap-16">
            {artworks.filter((_, i) => i % 2 === 1).map(renderArtwork)}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-24">
          <p className="text-gray-light italic">No paintings found</p>
        </div>
      )}
    </div>
  );
};
