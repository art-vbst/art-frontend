import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Artwork, ArtworkModel } from '~/api';
import { Cart, Navbar } from '~/components';
import { useCartStore, useTrackClick } from '~/data';

export const Layout = () => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const initialLoadRef = React.useRef(true);
  const location = useLocation();

  const { cart, setCart } = useCartStore();
  const trackCartClick = useTrackClick('cart');

  React.useEffect(() => {
    if (initialLoadRef.current) {
      const cartJSON = localStorage.getItem('cart');
      const cart = cartJSON ? JSON.parse(cartJSON) : [];

      Promise.allSettled(
        cart.map((item: Artwork) => ArtworkModel.get(item.id).then((artwork) => artwork.data)),
      ).then((artworks) => {
        const filteredArtworks = artworks
          .filter(
            (promise): promise is PromiseFulfilledResult<Artwork> =>
              promise.status === 'fulfilled' && promise.value.status === 'available',
          )
          .map((promise) => promise.value);
        setCart(filteredArtworks);
      });

      initialLoadRef.current = false;
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const location_path = location.pathname;
  const isSpecialPage =
    location_path === '/404' ||
    location_path === '/checkout-return' ||
    location_path === '/health-check';

  return (
    <div className="w-full min-h-screen flex flex-col relative">
      <div className={isSpecialPage ? '[&_.Navbar]:animate-boxShadow' : ''}>
        <Navbar onCartOpen={() => setCartOpen(true)} />
      </div>
      <div
        className="z-[100] select-none fixed top-0 right-0 w-[80px] h-[80px] cursor-pointer max-[720px]:hidden"
        style={{
          background:
            'linear-gradient(45deg, transparent, transparent calc(50% - 1px), #eee calc(50% - 1px), #eee calc(50% + 1px), white calc(50% + 1px))',
        }}
        onClick={() => {
          setCartOpen(true);
          trackCartClick('Cart Badge');
        }}
      >
        <div className="absolute top-2 right-2 flex items-center justify-center gap-[6px]">
          <ShoppingCart className="w-5 h-5 text-gray-light stroke-gray-light" />
          <p className="text-sm font-semibold">{cart.length}</p>
        </div>
      </div>
      <div className="flex-1 max-[720px]:mt-[116px] max-[480px]:mt-[100px]">
        <Outlet />
      </div>
      {/* <Footer /> */}
      <Cart items={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};
