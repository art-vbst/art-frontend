import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from './layout/error';
import { Layout } from './layout/layout';
import { About } from './pages/about/About';
import ArtDetail from './pages/art/ArtDetail';
import ArtList from './pages/art/ArtList';
import Gallery from './pages/art/Gallery';
import { Error } from './pages/general/Error';
import { HealthCheck } from './pages/general/HealthCheck';
import { NotFound } from './pages/general/NotFound';
import { CheckoutReturn } from './pages/orders/CheckoutReturn';

const LayoutWithBoundary = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Layout />
    </ErrorBoundary>
  );
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutWithBoundary />,
    children: [
      {
        path: '/',
        element: <ArtList />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/gallery',
        element: <Gallery />,
      },
      {
        path: '/art/:id',
        element: <ArtDetail />,
      },
      {
        path: '/checkout/success',
        element: <CheckoutReturn />,
      },
      {
        path: '/health',
        element: <HealthCheck />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
