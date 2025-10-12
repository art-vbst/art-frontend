import * as React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useParams } from 'react-router';
import { Artwork, ArtworkModel } from '~/api';
import { Button, Spinner } from '~/components';
import { useCartStore, useTrackClick } from '~/data';
import { NotFound } from '~/pages';
import { getMedium } from '~/utils/api';

export const ArtDetail = () => {
  const [artwork, setArtwork] = React.useState<Artwork | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  const { id } = useParams();
  const { cart, addToCart } = useCartStore();
  const trackClick = useTrackClick('add-to-cart');

  const spinnerTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    const startTime = Date.now();
    ArtworkModel.get(id)
      .then((res) => setArtwork(res.data))
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      })
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, 300 - elapsed);
        spinnerTimeoutRef.current = setTimeout(() => setLoading(false), remainingTime);
      });
    return () => {
      if (spinnerTimeoutRef.current) clearTimeout(spinnerTimeoutRef.current);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-[1140px] mx-auto px-8 pb-8 box-border w-full max-[1020px]:px-4 max-[1020px]:pb-8">
        <div className="flex justify-center items-center w-full pt-8">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!artwork || notFound) return <NotFound />;

  return (
    <div className="max-w-[1140px] mx-auto px-8 pb-8 box-border w-full max-[1020px]:px-4 max-[1020px]:pb-8">
      <Link to="/" className="mb-8 flex items-center gap-2 no-underline text-sm max-[720px]:my-4">
        <ChevronLeft />
        <p>Back to Store</p>
      </Link>
      <div className="w-full flex gap-8 max-[1020px]:flex-col">
        <div className="flex-1 flex gap-4 w-full max-[720px]:flex-[unset] max-[720px]:flex-col-reverse max-[720px]:w-full max-[720px]:overflow-hidden">
          <div className="flex-[1_1_70px] max-w-[80px] flex flex-col gap-[2px] max-[720px]:max-w-full max-[720px]:flex-row max-[720px]:flex-wrap max-[720px]:justify-start max-[720px]:w-full max-[720px]:overflow-hidden">
            {artwork.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`max-h-20 max-w-20 min-w-20 cursor-pointer relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white/50 after:transition-[background-color] after:duration-200 after:ease hover:after:bg-transparent max-[720px]:shrink-0 ${
                  selectedImageIndex === index ? 'after:!bg-transparent' : ''
                }`}
              >
                <img
                  src={image.image_url}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex-[1_1_500px] w-full max-[720px]:flex-[unset] max-[720px]:w-full">
            <img
              src={artwork.images[selectedImageIndex]?.image_url}
              alt={artwork.title}
              className="w-full h-auto max-w-full block"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 max-[720px]:flex-[unset] max-[720px]:w-full">
          <h1 className="text-[30px] font-normal max-[720px]:break-words max-[720px]:[hyphens:auto] min-[481px]:max-[484px]:max-w-[calc(100vw-4rem)]">
            {artwork.title}
          </h1>
          <p className="text-sm font-medium">
            {`${Number(artwork.price_cents / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })} USD`}
          </p>
          <p className="text-[13px] text-gray-light max-[720px]:break-words max-[720px]:max-w-full min-[481px]:max-[484px]:max-w-[calc(100vw-4rem)]">
            Unframed original painting.
          </p>
          <p className="text-[13px] text-gray-light max-[720px]:break-words max-[720px]:max-w-full min-[481px]:max-[484px]:max-w-[calc(100vw-4rem)]">
            Medium: {getMedium(artwork.medium)}
          </p>
          <p className="text-[13px] text-gray-light max-[720px]:break-words max-[720px]:max-w-full min-[481px]:max-[484px]:max-w-[calc(100vw-4rem)]">
            Size: {Number(artwork.width_inches)}" x {Number(artwork.height_inches)}"
          </p>
          <p className="text-[13px] text-gray-light max-[720px]:break-words max-[720px]:max-w-full min-[481px]:max-[484px]:max-w-[calc(100vw-4rem)]">
            Stephanie Bergeson{artwork.painting_year ? `, ${artwork.painting_year}` : ''}
          </p>
          <Button
            className="mt-4 self-start rounded-[3px]"
            onClick={() => {
              if (artwork.status !== 'available') return;
              trackClick(artwork.title);
              addToCart(artwork);
            }}
            disabled={cart.some((item) => item.id === artwork.id) || artwork.status !== 'available'}
          >
            {artwork.status === 'coming_soon'
              ? 'Coming Soon!'
              : artwork.status === 'not_for_sale'
                ? 'Not for Sale'
                : artwork.status === 'sold'
                  ? 'Already Sold'
                  : cart.some((item) => item.id === artwork.id)
                    ? 'Added to Cart!'
                    : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};
