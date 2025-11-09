import { NavLink, useMatch } from 'react-router-dom';
import { NavLinkData } from './Navbar';
import { cn } from '~/utils/cn';

type NavDesktopProps = {
  navlinks: NavLinkData[];
};

const NavLinkWithUnderline = ({ to, label }: { to: string; label: string }) => {
  const match = useMatch({ path: to, end: to === '/' });
  const isActive = !!match;

  return (
    <NavLink
      to={to}
      className={cn(
        'text-gray-light relative text-sm font-medium transition-colors',
        isActive && 'text-black',
      )}
    >
      {label}
      <span
        className={cn(
          'absolute -bottom-1.5 left-0 h-0.5 w-full origin-center bg-black/90 transition-transform duration-200',
          isActive ? 'scale-x-75' : 'scale-x-0',
        )}
      />
    </NavLink>
  );
};

export const NavDesktop = ({ navlinks }: NavDesktopProps) => {
  function renderNavLink(to: string, label: string) {
    return <NavLinkWithUnderline key={to} to={to} label={label} />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-6 py-12">
      <h1
        className="text-center text-3xl font-medium"
        style={{ color: '#64349f' }}
      >
        Violet Bergeson Art
      </h1>
      <div className="flex items-center gap-12">
        {navlinks.map((navlink) => renderNavLink(navlink.to, navlink.label))}
      </div>
    </div>
  );
};
