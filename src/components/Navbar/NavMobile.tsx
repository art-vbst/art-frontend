import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinkData } from './Navbar';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { cn } from '~/utils/cn';
import { useCartStore } from '~/data/stores';

type NavMobileProps = {
  navlinks: NavLinkData[];
};

export const NavMobile = ({ navlinks }: NavMobileProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cart, setIsCartOpen } = useCartStore();

  function handleCartOpen() {
    setIsCartOpen(true);
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          'relative z-15 flex w-full items-center justify-between bg-white px-6 py-8',
          isMenuOpen ? 'shadow-none' : 'shadow-sm',
        )}
      >
        <h2 className="text-primary text-center text-2xl font-medium">
          Violet Bergeson Art
        </h2>
        <div className="flex items-center gap-6 pr-1">
          <button className="relative cursor-pointer" onClick={handleCartOpen}>
            <ShoppingBag className="text-gray-light h-6 w-6" />
            {cart.length > 0 && (
              <div className="bg-primary-600 absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-white">
                <p className="text-[9px] font-semibold">{cart.length}</p>
              </div>
            )}
          </button>
          <button
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
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
  function renderNavLink(to: string, label: string) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          cn(
            'font-medium transition-colors',
            isActive ? 'text-black' : 'text-gray-400',
          )
        }
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </NavLink>
    );
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
      <div className="animate-slideFromTop absolute top-full left-0 z-10 flex w-full flex-col items-end bg-white p-6 pt-0 shadow-xl">
        {navlinks.map((navlink, index) => (
          <React.Fragment key={navlink.to}>
            <div className="flex flex-col items-end py-4 pr-1">
              {renderNavLink(navlink.to, navlink.label)}
            </div>
            {index < navlinks.length - 1 && (
              <div className="ml-auto w-10 border-t-2 border-gray-300 pr-1" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
