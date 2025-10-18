import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '~/components/Button/Button';
import { PageContainer } from '~/components/PageContainer/PageContainer';
import { useCartStore } from '~/data/stores';

export const CheckoutReturn = () => {
  const navigate = useNavigate();
  const { setCart } = useCartStore();

  React.useEffect(() => setCart([]), []);

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">Order Successful!</h2>
      <p className="text-gray-light">
        Your order has been received! A confirmation email will be sent to your
        email address.
      </p>
      <Button className="mt-8" onClick={() => navigate('/')}>
        Continue shopping
      </Button>
    </PageContainer>
  );
};
