import { Outlet } from 'react-router-dom';
import { Cart } from '~/components/Cart/Cart';
import { CartBadge } from '~/components/Cart/CartBadge';
import { Navbar } from '~/components/Navbar/Navbar';
import { useIsSystemRoute } from '~/hooks/use-is-system-route';
import { useScrollToTop } from '~/hooks/use-scroll-to-top';
import { useValidateCart } from '~/hooks/use-validate-cart';
import { cn } from '~/utils/cn';

export const Layout = () => {
  useScrollToTop();
  useValidateCart();

  const isSystemRoute = useIsSystemRoute();

  return (
    <div className="flex min-h-screen flex-col">
      <div className={cn({ '[&_.Navbar]:animate-boxShadow': isSystemRoute })}>
        <Navbar />
      </div>
      <Cart />
      <CartBadge />
      <Outlet />
    </div>
  );
};
