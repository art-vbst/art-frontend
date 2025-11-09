import { Outlet } from 'react-router-dom';
import { Cart } from '~/components/Cart/Cart';
import { CartBadge } from '~/components/Cart/CartBadge';
import { Footer } from '~/components/Footer/Footer';
import { Navbar } from '~/components/Navbar/Navbar';
import { useScrollToTop } from '~/hooks/use-scroll-to-top';
import { useValidateCart } from '~/hooks/use-validate-cart';

export const Layout = () => {
  useScrollToTop();
  useValidateCart();

  return (
    <div className="relative flex min-h-svh w-full flex-col">
      <Navbar className="sticky top-0 z-10 mb-6 w-full sm:static sm:top-auto sm:mb-0 md:mb-6" />
      <Cart />
      <CartBadge />
      <div className="flex w-full flex-1 flex-col items-center px-5 pb-8 sm:pb-24">
        <div className="flex w-full max-w-5xl flex-col">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
