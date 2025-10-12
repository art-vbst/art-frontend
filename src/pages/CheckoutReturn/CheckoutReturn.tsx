import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '~/data';
import { Button, PageContainer } from '~/components';

export const CheckoutReturn = () => {
  const navigate = useNavigate();
  const { setCart } = useCartStore();

  React.useEffect(() => setCart([]), []);

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">Order Successful!</h2>
      <p className="text-gray-light">
        Your order has been received! A confirmation email will be sent to your email address.
      </p>
      <Button className="mt-8" onClick={() => navigate('/')}>
        Continue shopping
      </Button>
    </PageContainer>
  );
};
