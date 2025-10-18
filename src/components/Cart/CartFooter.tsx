import { http } from '~/api/http';
import { useCartStore } from '~/data/stores';
import { usePageAction } from '~/hooks/use-page-action';
import { centsToDollarString } from '~/utils/format';
import { Button } from '../Button/Button';

type CheckoutSessionResponse = {
  url: string;
};

export function CartFooter() {
  const { cart } = useCartStore();
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price_cents, 0);

  const { execute: requestCheckout, loading } = usePageAction(
    createCheckoutSession,
    redirectToCheckout,
  );

  function createCheckoutSession() {
    const body = { artwork_ids: cart.map((item) => item.id) };
    return http.post<CheckoutSessionResponse>('/checkout', body);
  }

  function redirectToCheckout(data: CheckoutSessionResponse) {
    window.location.href = data.url;
  }

  return (
    <div className="flex flex-col gap-6 border-t border-gray-200 p-6">
      <div className="flex justify-between">
        <p className="text-gray-light">Subtotal:</p>
        <p className="font-semibold">{centsToDollarString(cartSubtotal)}</p>
      </div>
      <Button
        variant="primary"
        disabled={loading || !cart.length}
        onClick={requestCheckout}
      >
        {loading ? 'Loading...' : 'Secure Checkout'}
      </Button>
    </div>
  );
}
