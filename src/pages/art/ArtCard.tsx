import { Artwork, ArtworkStatus } from '~/api/types';
import { centsToDollarString, formatInches } from '~/utils/format';
import { ImgWithPlaceholder } from '~/components/ImgWithPlaceholder/ImgWithPlaceholder';

type ArtCardProps = {
  artwork: Artwork;
  showInfo?: boolean;
  onClick?: () => void;
};

export const ArtCard = ({
  artwork,
  showInfo = true,
  onClick,
}: ArtCardProps) => {
  const mainImage = artwork.images[0];

  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center"
      onClick={onClick}
    >
      <ImgWithPlaceholder image={mainImage} alt={artwork.title} />
      {showInfo && <ArtCardInfo artwork={artwork} />}
    </div>
  );
};

const ArtCardInfo = ({ artwork }: { artwork: Artwork }) => {
  const price = centsToDollarString(artwork.price_cents);
  const size =
    formatInches(artwork.width_inches) +
    'x' +
    formatInches(artwork.height_inches);
  const titleString = `"${artwork.title}" ${size}`;

  return (
    <>
      <h3 className="mt-6 text-center text-2xl font-semibold">{titleString}</h3>
      <StatusText artwork={artwork} />
      <p className="text-gray-light mt-2 text-sm">{price}</p>
    </>
  );
};

const StatusText = ({ artwork }: { artwork: Artwork }) => {
  switch (artwork.status) {
    case ArtworkStatus.ComingSoon:
      return <p className="mt-4 text-blue-600">Coming Soon!</p>;
    default:
      return null;
  }
};
