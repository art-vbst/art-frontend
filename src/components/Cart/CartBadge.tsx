import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '~/data/stores';

export const CartBadge = () => {
  const { cart, setIsCartOpen } = useCartStore();

  return (
    <div
      className="fixed top-0 right-0 z-50 hidden h-20 w-20 cursor-pointer md:block"
      // style={{
      //   background:
      //     'linear-gradient(45deg, transparent, transparent calc(50% - 1px), #eee calc(50% - 1px), #eee calc(50% + 1px), white calc(50% + 1px))',
      // }}
      onClick={() => setIsCartOpen(true)}
    >
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <ShoppingCart className="text-gray-light h-5 w-5" />
        <p className="text-sm font-semibold">{cart.length}</p>
      </div>
    </div>
  );
};
