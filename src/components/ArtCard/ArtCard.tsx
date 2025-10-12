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
    <div className="w-full flex flex-col items-center select-none cursor-pointer" onClick={onClick}>
      <div className="w-full relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-transparent after:transition-[background-color] after:duration-300 after:ease-in-out group-hover:after:bg-white/15">
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
          className="w-full h-full object-cover"
        />
      </div>
      {showInfo && (
        <>
          <h3 className="text-[28px] font-semibold text-center mt-6 max-[480px]:text-[20px] max-[480px]:mt-4">{`"${artwork.title}" ${formatInches(artwork.width_inches)}x${formatInches(
            artwork.height_inches,
          )}`}</h3>
          {artwork.status === 'coming_soon' && (
            <p className="text-[rgb(32,32,220)] text-base mt-4">Coming Soon!</p>
          )}
          <p className="text-gray-light text-sm mt-4 max-[1020px]:mt-2 max-[720px]:mt-1">
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
