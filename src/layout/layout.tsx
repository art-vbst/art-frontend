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
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <Cart />
      <CartBadge />
      <Outlet />
    </div>
  );
};
