import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Artwork, ArtworkModel } from '~/api';
import { Cart } from '~/components/Cart/Cart';
import { Navbar } from '~/components/Navbar/Navbar';
import { useCartStore } from '~/data/stores';

export const Layout = () => {
  const [cartOpen, setCartOpen] = React.useState(false);
  const initialLoadRef = React.useRef(true);
  const location = useLocation();

  const { cart, setCart } = useCartStore();

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
  const isNonstandardPage =
    location_path === '/404' ||
    location_path === '/checkout-return' ||
    location_path === '/health-check';

  return (
    <div className="flex min-h-screen flex-col">
      <div className={isNonstandardPage ? '[&_.Navbar]:animate-boxShadow' : ''}>
        <Navbar onCartOpen={() => setCartOpen(true)} />
      </div>
      <div
        className="fixed top-0 right-0 z-50 hidden h-20 w-20 cursor-pointer md:block"
        style={{
          background:
            'linear-gradient(45deg, transparent, transparent calc(50% - 1px), #eee calc(50% - 1px), #eee calc(50% + 1px), white calc(50% + 1px))',
        }}
        onClick={() => {
          setCartOpen(true);
        }}
      >
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <ShoppingCart className="text-gray-light h-5 w-5" />
          <p className="text-sm font-semibold">{cart.length}</p>
        </div>
      </div>
      <Outlet />
      <Cart items={cart} isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};
