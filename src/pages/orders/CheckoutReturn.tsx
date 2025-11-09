import { OrderStatus, type OrderPublic } from '@art-vbst/art-types';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OrderModel } from '~/api/models';
import { Button } from '~/components/Button/Button';
import { PageContainer } from '~/components/PageContainer/PageContainer';
import { Spinner } from '~/components/Spinner/Spinner';
import { useCartStore } from '~/data/stores';

const POLL_INTERVAL = 1_000;
const POLL_TIMEOUT = 20_000;

export const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCart } = useCartStore();

  const [error, setError] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState<OrderPublic | null>(null);

  const orderId = searchParams.get('order_id');
  const stripeSessionId = searchParams.get('session_id');

  const pollRef = React.useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const pollTimeoutRef = React.useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);

  React.useEffect(() => {
    setCart([]);

    pollForOrder();

    const interval = setInterval(pollForOrder, POLL_INTERVAL);
    pollRef.current = interval;

    const timeout = setTimeout(handlePollTimeout, POLL_TIMEOUT);
    pollTimeoutRef.current = timeout;

    return () => {
      clearInterval(pollRef.current ?? undefined);
      clearTimeout(pollTimeoutRef.current ?? undefined);
    };
  }, []);

  const pollForOrder = async () => {
    try {
      if (!orderId) {
        throw new Error('Order ID is required');
      }

      const res = await OrderModel.get(orderId, {
        stripe_session_id: stripeSessionId,
      });

      setOrder(res.data);

      if (res.data.status !== OrderStatus.Pending) {
        clearInterval(pollRef.current);
      }
    } catch (err: unknown) {
      clearInterval(pollRef.current);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    }
  };

  const handlePollTimeout = () => {
    clearInterval(pollRef.current);
    setError('polling timeout');
  };

  const homepageButton = (
    <Button className="mt-8" onClick={() => navigate('/')} variant="outline">
      Go to Homepage
    </Button>
  );

  const supportButton = (
    <Button
      className="mt-8"
      onClick={() =>
        (window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`)
      }
      variant="outline"
    >
      Contact Support
    </Button>
  );

  const getStatusDisplay = (): {
    title: string;
    message: React.ReactNode;
    showSupportButton?: boolean;
  } => {
    if (!order && !error) {
      return {
        title: 'Loading order status...',
        message: 'Please wait while we retrieve your order information.',
      };
    }

    switch (order?.status) {
      case OrderStatus.Processing:
        return {
          title: 'Order Successful',
          message:
            'Thank you for your purchase! Your order has been completed.',
        };
      case OrderStatus.Failed:
        return {
          title: 'Order Failed',
          message: (
            <>
              Unfortunately, your order could not be processed. Your payment
              will not be charged.
              <br /> Please try again or contact support if the issue persists.
            </>
          ),
        };
      case OrderStatus.Canceled:
        return {
          title: 'Order Canceled',
          message:
            'Your order has been canceled. If you did not request this cancellation, please contact support.',
          showSupportButton: true,
        };
      default:
        return {
          title: 'Order Error',
          message:
            'An unknown error occurred. Please contact support for assistance.',
          showSupportButton: true,
        };
    }
  };

  const statusDisplay = getStatusDisplay();
  const isLoading = !error && (!order || order.status === OrderStatus.Pending);

  if (isLoading) {
    return (
      <PageContainer>
        <Spinner width={48} height={48} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h2 className="mt-8 text-2xl font-semibold text-gray-900">
        {statusDisplay.title}
      </h2>
      <p className="text-xs font-medium tracking-wide">Order ID: {orderId}</p>
      <p className="mt-2 leading-8">
        {statusDisplay.message}
        {order?.status === OrderStatus.Processing && (
          <>
            <br />A confirmation email has been sent to the provided email
            address.
          </>
        )}
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => navigate('/')} variant="outline">
          Go to Homepage
        </Button>
        {statusDisplay.showSupportButton && (
          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`)
            }
          >
            Contact Support
          </Button>
        )}
      </div>
    </PageContainer>
  );
};
