import { Outlet, RouteObject } from 'react-router';
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

const Boundary = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Outlet />
    </ErrorBoundary>
  );
};

const systemRoutes: RouteObject[] = [
  {
    path: '/checkout/return',
    element: <CheckoutReturn />,
  },
  {
    path: '/checkout/return',
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
];

const standardRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
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
    ],
  },
];

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Boundary />,
    children: [...systemRoutes, ...standardRoutes],
  },
];
