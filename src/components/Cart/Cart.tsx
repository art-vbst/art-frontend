import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { http } from '~/api';
import { useCartStore } from '~/data/stores';
import { centsToDollarString } from '~/utils/format';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useCartStore();

  const [loading, setLoading] = React.useState(false);

  function handleCheckout() {
    setLoading(true);
    http
      .post('/stripe/checkout', { artwork_ids: cart.map((item) => item.id) })
      .then((res) => (window.location.href = res.data.url))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-40 bg-black/50"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="animate-slideFromRight fixed top-0 right-0 z-50 flex h-screen w-full max-w-lg flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <span className="flex items-center gap-3">
            <ShoppingCart />
            <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          </span>
          <button className="p-2 hover:opacity-70" onClick={() => setIsCartOpen(false)}>
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-light p-6">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b p-6 last:border-b-0">
                <img
                  src={item.images[0]?.image_url}
                  alt={item.title}
                  className="h-20 w-20 cursor-pointer rounded object-cover"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate(`/art/${item.id}`);
                  }}
                />
                <div className="flex flex-col gap-2">
                  <h3
                    className="cursor-pointer font-medium"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate(`/art/${item.id}`);
                    }}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <p className="text-gray-600">{centsToDollarString(item.price_cents)}</p>
                    <button className="text-red-600" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col gap-6 border-t p-6">
          <div className="flex justify-between">
            <p className="text-gray-light">Subtotal:</p>
            <p className="font-semibold">
              {centsToDollarString(cart.reduce((acc, item) => acc + item.price_cents, 0))}
            </p>
          </div>
          <button
            className="border-gray-dark hover:bg-gray-dark w-full rounded border py-3 hover:text-white disabled:opacity-50"
            disabled={cart.length === 0 || loading}
            onClick={handleCheckout}
          >
            {loading ? 'Loading...' : 'Secure Checkout'}
          </button>
        </div>
      </div>
    </>
  );
};
