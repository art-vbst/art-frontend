import { useCartStore } from '~/data/stores';
import { CartBody } from './CartBody';
import { CartHeader } from './CartHeader';
import { CartFooter } from './CartFooter';

export const Cart = () => {
  const { isCartOpen, setIsCartOpen } = useCartStore();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div id="cart">
      <div
        className="animate-fadeIn fixed inset-0 z-20 bg-black/50"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="animate-slideFromRight fixed inset-y-0 right-0 z-20 flex w-full max-w-lg flex-col bg-white shadow-xl">
        <CartHeader />
        <CartBody className="flex-1 overflow-y-auto" />
        <CartFooter />
      </div>
    </div>
  );
};
