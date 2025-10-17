import { Artwork, ArtworkStatus } from '~/api/types';
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
      case ArtworkStatus.Pending:
        return 'Pending';
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

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-normal">{artwork.title}</h1>
      <p className="text-sm font-medium">{centsToDollarString(artwork.price_cents)}</p>
      <p className="text-gray-light text-sm">Unframed original painting.</p>
      <p className="text-gray-light text-sm">Medium: {getMedium(artwork.medium)}</p>
      <p className="text-gray-light text-sm">
        Size: {Number(artwork.width_inches)}" x {Number(artwork.height_inches)}"
      </p>
      <p className="text-gray-light text-sm">
        Stephanie Bergeson{artwork.painting_year ? `, ${artwork.painting_year}` : ''}
      </p>
      <Button
        className="mt-4 self-start rounded-sm border-none bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-white disabled:hover:bg-gray-600"
        onClick={handleAddToCart}
        disabled={artworkInCart || artwork.status !== ArtworkStatus.Available}
      >
        {getStatusText()}
      </Button>
    </div>
  );
};
