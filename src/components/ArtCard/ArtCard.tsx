import * as React from 'react';
import { Artwork } from '~/api';
import { formatInches } from '~/api/utils';
import { ShimmerPlaceholder } from '../ShimmerPlaceholder/ShimmerPlaceholder';

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
    <div className="flex cursor-pointer flex-col items-center" onClick={onClick}>
      <div className="relative w-full">
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
          <h3 className="mt-6 text-center text-2xl font-semibold">{`"${artwork.title}" ${formatInches(artwork.width_inches)}x${formatInches(
            artwork.height_inches,
          )}`}</h3>
          {artwork.status === 'coming_soon' && <p className="mt-4 text-blue-600">Coming Soon!</p>}
          <p className="text-gray-light mt-2 text-sm">
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
