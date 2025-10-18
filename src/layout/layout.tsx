import { Outlet } from 'react-router-dom';
import { Cart } from '~/components/Cart/Cart';
import { CartBadge } from '~/components/Cart/CartBadge';
import { Navbar } from '~/components/Navbar/Navbar';
import { useScrollToTop } from '~/hooks/use-scroll-to-top';
import { useValidateCart } from '~/hooks/use-validate-cart';

export const Layout = () => {
  useScrollToTop();
  useValidateCart();

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <Navbar className="mb-6 sm:mb-0" />
      <Cart />
      <CartBadge />
      <div className="flex w-full flex-col items-center px-5 pb-16">
        <div className="flex w-full max-w-5xl flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
