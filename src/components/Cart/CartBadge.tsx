import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '~/data/stores';
import { useResizeListener } from '~/hooks/use-resize-listener';
import { mobileBreakpoint } from '~/utils/breakpoints';
import { cn } from '~/utils/cn';

export const CartBadge = () => {
  const { cart, setIsCartOpen } = useCartStore();

  const isMobile = useResizeListener(`(min-width: ${mobileBreakpoint})`);

  if (!isMobile) {
    return null;
  }

  return (
    <button
      className="fixed top-4 right-5 z-5 cursor-pointer rounded-full border border-gray-200 bg-white p-3 shadow-sm"
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingBag className="text-gray-light h-5 w-5" />
      <CartBadgeCount
        count={cart.length}
        className="absolute -top-0.5 -left-0.5"
      />
    </button>
  );
};

const CartBadgeCount = ({
  count,
  className,
}: {
  count: number;
  className: string;
}) => {
  if (!count) {
    return null;
  }

  return (
    <div
      className={cn(
        'bg-primary-600 flex h-4 w-4 items-center justify-center rounded-full text-white',
        className,
      )}
    >
      <p className="text-[9px] font-semibold">{count}</p>
    </div>
  );
};
