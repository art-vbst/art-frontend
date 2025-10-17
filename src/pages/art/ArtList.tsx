import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtworkModel } from '~/api/models';
import { Artwork } from '~/api/types';
import { ArtCard } from '~/components/ArtCard/ArtCard';
import { Spinner } from '~/components/Spinner/Spinner';

export const ArtList = () => {
  return (
    <div className="flex w-full justify-center p-8 pb-24">
      <div className="w-full max-w-5xl">
        <ArtListContent />
      </div>
    </div>
  );
};

const ArtListContent = () => {
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
    return <ArtCard artwork={artwork} onClick={() => navigate(`/art/${artwork.id}`)} />;
  };

  if (loading) {
    return (
      <div className="flex justify-center pt-8">
        <Spinner />
      </div>
    );
  }

  if (artworks.length === 0) {
    return (
      <div className="mt-24 flex items-center justify-center">
        <p className="text-gray-light italic">No paintings found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 md:flex-row">
      <div className="flex flex-1 flex-col gap-16">
        {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
      </div>
      <div className="flex flex-1 flex-col gap-16">
        {artworks.filter((_, i) => i % 2 === 1).map(renderArtwork)}
      </div>
    </div>
  );
};
