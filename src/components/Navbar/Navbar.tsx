import * as React from 'react';
import { useResizeListener } from '~/hooks/use-resize-listener';
import { NavDesktop } from './NavDesktop';
import { NavMobile } from './NavMobile';

export type NavLinkData = {
  to: string;
  label: string;
};

export const Navbar = () => {
  const [mobile, setMobile] = React.useState(false);

  useResizeListener('(max-width: 720px)', (queryMatches) => {
    setMobile(queryMatches);
  });

  const navlinks: NavLinkData[] = [
    { to: '/', label: 'Available Artwork' },
    { to: '/about', label: 'About' },
    { to: '/gallery', label: 'Gallery' },
  ];

  return mobile ? <NavMobile navlinks={navlinks} /> : <NavDesktop navlinks={navlinks} />;
};
