import { useResizeListener } from '~/hooks/use-resize-listener';
import { NavDesktop } from './NavDesktop';
import { NavMobile } from './NavMobile';
import { mobileBreakpoint } from '~/utils/breakpoints';

export type NavLinkData = {
  to: string;
  label: string;
};

export const Navbar = ({ className }: { className?: string }) => {
  const isMobile = useResizeListener(`(max-width: ${mobileBreakpoint})`);

  const navlinks: NavLinkData[] = [
    { to: '/', label: 'Available Artwork' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
  ];

  return (
    <div className={className}>
      {isMobile ? (
        <NavMobile navlinks={navlinks} />
      ) : (
        <NavDesktop navlinks={navlinks} />
      )}
    </div>
  );
};
