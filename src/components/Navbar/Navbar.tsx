import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCartStore } from '~/data/stores';

type NavbarProps = {
  onCartOpen: () => void;
};

export const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 720px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMenuOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full shadow-md md:relative md:shadow-none">
      <div className="Navbar relative flex flex-col items-center gap-9 bg-white py-10">
        <h1 className="text-center text-3xl font-semibold md:text-left">Stephanie Bee Studio</h1>
        <div className="hidden items-center gap-11 md:flex">
          <NavLink
            to="/"
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark font-mono text-sm"
          >
            Available Artwork
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark font-mono text-sm"
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark font-mono text-sm"
          >
            Gallery
          </NavLink>
        </div>
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 md:hidden"
          onClick={() => setMenuOpen((p) => !p)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <MenuModal isOpen={menuOpen} onClose={() => setMenuOpen(false)} onCartOpen={onCartOpen} />
    </div>
  );
};

type MenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCartOpen: () => void;
};

const MenuModal = ({ isOpen, onClose, onCartOpen }: MenuModalProps) => {
  const { cart } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="animate-fadeIn fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="animate-slideFromTop absolute top-full left-0 z-50 w-full">
        <div className="flex flex-col items-center gap-6 bg-white p-6 font-mono shadow-xl">
          <NavLink
            to="/"
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Available Artwork
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Gallery
          </NavLink>
          <button
            className="bg-gray-dark hover:bg-gray-dark/80 rounded-lg px-8 py-3 text-white"
            onClick={() => {
              onClose();
              onCartOpen();
            }}
          >
            My Cart - {cart.length} item{cart.length === 1 ? '' : 's'}
          </button>
        </div>
      </div>
    </>
  );
};
