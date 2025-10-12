import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '~/data';
import { Artwork, http } from '~/api';

interface CartProps {
  items: Artwork[];
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = (props: CartProps) => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const { removeFromCart } = useCartStore();

  function centsToDollars(cents: number) {
    return Number(cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  function handleCheckout() {
    setLoading(true);
    http
      .post('/stripe/checkout', { artwork_ids: props.items.map((item) => item.id) })
      .then((res) => (window.location.href = res.data.url))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  if (!props.isOpen) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/50 z-[999] animate-fadeIn"
        onClick={props.onClose}
      />
      <div className="fixed top-0 right-0 w-[500px] max-w-full py-6 h-[calc(100vh-48px)] h-[calc(100dvh-48px)] bg-white shadow-[-2px_0_8px_rgba(0,0,0,0.1)] z-[1000] flex flex-col animate-slideFromRight">
        <div className="px-6 flex justify-between items-center mb-6">
          <span className="flex items-center gap-3">
            <ShoppingCart />
            <h2 className="m-0 text-2xl font-semibold">Shopping Cart</h2>
          </span>
          <button
            className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
            onClick={props.onClose}
          >
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          {props.items.length === 0 ? (
            <p className="m-0 text-base text-gray-light px-6">Your cart is empty.</p>
          ) : (
            props.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-4 mx-6 border-b border-[#eee] last:border-b-0"
              >
                <img
                  src={item.images[0]?.image_url}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded cursor-pointer"
                  onClick={() => {
                    props.onClose();
                    navigate(`/art/${item.id}`);
                  }}
                />
                <div className="flex flex-col justify-center gap-2">
                  <h3
                    className="m-0 text-base font-medium cursor-pointer"
                    onClick={() => {
                      props.onClose();
                      navigate(`/art/${item.id}`);
                    }}
                  >
                    {item.title}
                  </h3>
                  <span className="flex items-center gap-4">
                    <p className="m-0 text-sm text-[#666]">{centsToDollars(item.price_cents)}</p>
                    <a
                      className="text-red-600 cursor-pointer no-underline text-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </a>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="pt-8 px-6 border-t border-[#eee] flex flex-col items-end gap-8">
          <span className="flex gap-4">
            <p className="text-base text-gray-light">Subtotal:</p>
            <p className="text-base font-semibold">
              {centsToDollars(props.items.reduce((acc, item) => acc + item.price_cents, 0))}
            </p>
          </span>
          <button
            className="w-full py-3 px-4 rounded text-base font-medium bg-transparent text-gray-dark border border-gray-dark cursor-pointer transition-all duration-200 hover:bg-gray-dark hover:text-white active:bg-gray-dark/90 disabled:text-[#aaa] disabled:border-[#aaa] disabled:cursor-not-allowed disabled:hover:bg-transparent"
            disabled={props.items.length === 0 || loading}
            onClick={handleCheckout}
          >
            {loading ? 'Loading...' : 'Secure Checkout'}
          </button>
        </div>
      </div>
    </>
  );
};
