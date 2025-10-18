import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Artwork } from '~/api/types';
import { useCartStore } from '~/data/stores';
import { cn } from '~/utils/cn';
import { centsToDollarString } from '~/utils/format';

export const CartBody = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <CartBodyContent />
    </div>
  );
};

const CartBodyContent = () => {
  const { cart } = useCartStore();

  if (cart.length === 0) {
    return <p className="text-gray-light p-6">Your shopping bag is empty.</p>;
  }

  return cart.map((item) => (
    <CartBodyItem
      key={item.id}
      item={item}
      className="border-b border-gray-100 last:border-b-0"
    />
  ));
};

const CartBodyItem = ({
  item,
  className,
}: {
  item: Artwork;
  className?: string;
}) => {
  const navigate = useNavigate();
  const { setIsCartOpen, removeFromCart } = useCartStore();

  function handleItemClick(item: Artwork) {
    setIsCartOpen(false);
    navigate(`/art/${item.id}`);
  }

  function renderItemImage() {
    return (
      <img
        src={item.images[0]?.image_url}
        alt={item.title}
        className="h-20 w-20 cursor-pointer rounded object-cover"
        onClick={() => handleItemClick(item)}
      />
    );
  }

  function renderItemInfo() {
    return (
      <div className="flex flex-1 flex-col gap-2">
        <h3
          className="cursor-pointer font-medium"
          onClick={() => handleItemClick(item)}
        >
          {item.title}
        </h3>
        <p className="text-sm text-gray-600">
          {centsToDollarString(item.price_cents)}
        </p>
      </div>
    );
  }

  function renderItemRemove() {
    return (
      <button
        className="cursor-pointer text-sm text-red-600"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div key={item.id} className={cn('flex items-center gap-4 p-6', className)}>
      {renderItemImage()}
      {renderItemInfo()}
      {renderItemRemove()}
    </div>
  );
};
