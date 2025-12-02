import { Artwork, ArtworkStatus } from '@art-vbst/art-types';
import { getMedium } from '~/api/utils';
import { Button } from '~/components/Button/Button';
import { useCartStore } from '~/data/stores';
import { checkExhaustiveness, centsToDollarString } from '~/utils/format';

export const ArtDetailInfo = ({ artwork }: { artwork: Artwork }) => {
  const { cart, addToCart } = useCartStore();

  const artworkInCart = cart.some((item) => item.id === artwork.id);

  function handleAddToCart() {
    if (artwork.status !== ArtworkStatus.Available) return;
    addToCart(artwork);
  }

  function getStatusText() {
    if (artworkInCart) {
      return 'Added to Cart!';
    }

    switch (artwork.status) {
      case ArtworkStatus.Available:
        return 'Add to Cart';
      case ArtworkStatus.Sold:
        return 'Sold';
      case ArtworkStatus.NotForSale:
        return 'Not for Sale';
      case ArtworkStatus.Unavailable:
        return 'Unavailable';
      case ArtworkStatus.ComingSoon:
        return 'Coming Soon!';
      default:
        return checkExhaustiveness(artwork.status);
    }
  }

  function getSizeString(width: number, height: number) {
    return `${Number(width)}" x ${Number(height)}"`;
  }

  function getArtistTimestamp(name: string, year: number | null) {
    if (!year) return name;
    return `${name}, ${year}`;
  }

  return (
    <div className="flex flex-col gap-6 text-gray-600">
      <h1 className="text-3xl font-medium text-gray-900">{artwork.title}</h1>
      <p className="font-medium text-gray-900">
        {centsToDollarString(artwork.price_cents)}
      </p>
      {artwork.description && <p>{artwork.description}</p>}
      <p>Medium: {getMedium(artwork.medium)}</p>
      <p>Size: {getSizeString(artwork.width_inches, artwork.height_inches)}</p>
      <p>{getArtistTimestamp('Violet Bergeson', artwork.painting_year)}</p>
      <Button
        className="my-4 self-start"
        onClick={handleAddToCart}
        disabled={artworkInCart || artwork.status !== ArtworkStatus.Available}
      >
        {getStatusText()}
      </Button>
    </div>
  );
};
