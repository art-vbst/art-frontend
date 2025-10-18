import { ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '~/data/stores';

export function CartHeader() {
  const { setIsCartOpen } = useCartStore();

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <span className="flex items-center gap-3">
        <ShoppingBag />
        <h2 className="text-xl font-semibold">Shopping Bag</h2>
      </span>
      <button
        className="cursor-pointer rounded-full border-none bg-transparent p-2 transition-colors duration-200 hover:bg-gray-100"
        onClick={() => setIsCartOpen(false)}
      >
        <X />
      </button>
    </div>
  );
}
