import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkData } from './Navbar';
import { Menu, X } from 'lucide-react';
import { cn } from '~/utils/cn';
import { pluralize } from '~/utils/format';
import { useCartStore } from '~/data/stores';

type NavMobileProps = {
  navlinks: NavLinkData[];
};

export const NavMobile = ({ navlinks }: NavMobileProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="sticky top-0 left-0 z-10">
      <div
        className={cn(
          'relative z-15 flex w-full items-center justify-between bg-white px-6 py-8',
          isMenuOpen ? 'shadow-none' : 'shadow-md',
        )}
      >
        <h2 className="text-center text-xl font-semibold">
          Stephanie Bee Studio
        </h2>
        <button
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <NavMobileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navlinks={navlinks}
      />
    </div>
  );
};

type NavMobileMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  navlinks: NavLinkData[];
};

const NavMobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  navlinks,
}: NavMobileMenuProps) => {
  const { cart, setIsCartOpen } = useCartStore();

  function handleCartOpen() {
    setIsMenuOpen(false);
    setIsCartOpen(true);
  }

  function renderNavLink(to: string, label: string) {
    return (
      <NavLink
        to={to}
        className="text-gray-light font-mono text-sm"
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </NavLink>
    );
  }

  function getCartButtonText() {
    const base = 'My Bag';

    return cart.length === 0
      ? base
      : `${base} - ${cart.length} ${pluralize(cart.length, 'item')}`;
  }

  if (!isMenuOpen) {
    return null;
  }

  return (
    <>
      <div
        className="animate-fadeIn fixed inset-0 z-5 bg-black/50"
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="animate-slideFromTop absolute top-full left-0 z-10 flex w-full flex-col items-center gap-6 bg-white p-6 pt-0 font-mono shadow-xl">
        {navlinks.map((navlink) => renderNavLink(navlink.to, navlink.label))}
        <button
          className="cursor-pointer rounded-lg bg-gray-900 px-8 py-3 text-white hover:bg-gray-800"
          onClick={() => handleCartOpen()}
        >
          {getCartButtonText()}
        </button>
      </div>
    </>
  );
};
