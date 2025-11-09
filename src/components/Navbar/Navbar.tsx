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

  const mobileNavlinks: NavLinkData[] = [
    { to: '/', label: 'Available Artwork' },
    { to: '/about', label: 'About Me' },
    { to: '/portfolio', label: 'Portfolio' },
  ];

  const desktopNavlinks: NavLinkData[] = [
    { to: '/', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
  ];

  return (
    <div className={className}>
      {isMobile ? (
        <NavMobile navlinks={mobileNavlinks} />
      ) : (
        <NavDesktop navlinks={desktopNavlinks} />
      )}
    </div>
  );
};
