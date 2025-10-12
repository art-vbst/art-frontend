import * as React from 'react';
import { Artwork } from '~/api';
import { formatInches } from '~/utils/api';
import { ShimmerPlaceholder } from '~/components';

type ArtCardProps = {
  artwork: Artwork;
  showInfo?: boolean;
  onClick?: () => void;
};

export const ArtCard = ({ artwork, showInfo = true, onClick }: ArtCardProps) => {
  const [srcLoaded, setSrcLoaded] = React.useState(false);

  const mainImage = artwork.images[0];
  const width = mainImage?.image_width;
  const height = mainImage?.image_height;

  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="w-full relative after:absolute after:inset-0 after:bg-transparent after:transition-colors group-hover:after:bg-white/15">
        {width && height && !srcLoaded && (
          <ShimmerPlaceholder
            style={{
              width: '100%',
              paddingBottom: `${(height / width) * 100}%`,
            }}
          />
        )}
        <img
          style={srcLoaded ? {} : { display: 'none' }}
          alt={artwork.title}
          src={mainImage?.image_url}
          onLoad={() => setSrcLoaded(true)}
          className="w-full object-cover"
        />
      </div>
      {showInfo && (
        <>
          <h3 className="text-2xl font-semibold text-center mt-6">{`"${artwork.title}" ${formatInches(artwork.width_inches)}x${formatInches(
            artwork.height_inches,
          )}`}</h3>
          {artwork.status === 'coming_soon' && <p className="text-blue-600 mt-4">Coming Soon!</p>}
          <p className="text-gray-light text-sm mt-2">
            {Number(artwork.price_cents / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </p>
        </>
      )}
    </div>
  );
};
