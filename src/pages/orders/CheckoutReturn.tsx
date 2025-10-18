import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '~/components/Button/Button';
import { PageContainer } from '~/components/PageContainer/PageContainer';
import { useCartStore } from '~/data/stores';

export const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCart } = useCartStore();

  const orderId = searchParams.get('order_id');

  React.useEffect(() => setCart([]), []);

  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">Order Successful!</h2>
      <p className="text-gray-light">
        Order ID: <span className="font-semibold">{orderId}</span>
      </p>
      <p className="text-gray-light">
        A confirmation email has been sent to the provided email address.
      </p>
      <Button className="mt-8" onClick={() => navigate('/')}>
        Continue shopping
      </Button>
    </PageContainer>
  );
};
