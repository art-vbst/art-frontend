import { NavLink } from 'react-router-dom';
import { NavLinkData } from './Navbar';

type NavDesktopProps = {
  navlinks: NavLinkData[];
};

export const NavDesktop = ({ navlinks }: NavDesktopProps) => {
  function renderNavLink(to: string, label: string) {
    return (
      <NavLink to={to} className="text-gray-light font-mono text-sm">
        {label}
      </NavLink>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-12 py-12">
      <h1 className="text-center text-3xl font-semibold">
        Stephanie Bee Studio
      </h1>
      <div className="flex items-center gap-12">
        {navlinks.map((navlink) => renderNavLink(navlink.to, navlink.label))}
      </div>
    </div>
  );
};
