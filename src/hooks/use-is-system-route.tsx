import { useLocation } from 'react-router-dom';

const systemRoutes = ['/404', '/checkout-return', '/health-check'];

export const useIsSystemRoute = () => {
  const location = useLocation();
  return systemRoutes.includes(location.pathname);
};
