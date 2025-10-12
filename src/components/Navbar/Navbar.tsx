import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCartStore, useTrackClick } from '~/data';

type NavbarProps = {
  onCartOpen: () => void;
};

export const Navbar = ({ onCartOpen }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const trackNavClick = useTrackClick('nav-link');

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
    <div className="md:relative fixed top-0 left-0 w-full z-50 md:shadow-none shadow-md">
      <div className="Navbar bg-white py-10 flex flex-col items-center gap-9 relative">
        <h1 className="text-3xl font-semibold text-center md:text-left">Stephanie Bee Studio</h1>
        <div className="md:flex hidden items-center gap-11">
          <NavLink
            to="/"
            onClick={() => trackNavClick('Available Artwork')}
            className="font-mono text-sm text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Available Artwork
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => trackNavClick('About')}
            className="font-mono text-sm text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => trackNavClick('Gallery')}
            className="font-mono text-sm text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Gallery
          </NavLink>
        </div>
        <button
          className="md:hidden absolute right-4 top-1/2 -translate-y-1/2"
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

  const trackNavClick = useTrackClick('nav-link');
  const trackCartClick = useTrackClick('cart');

  function handleLinkClick(name: string) {
    onClose();
    trackNavClick(name);
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" onClick={onClose} />
      <div className="absolute top-full left-0 w-full z-50 animate-slideFromTop">
        <div className="bg-white shadow-xl p-6 flex flex-col items-center gap-6 font-mono">
          <NavLink
            to="/"
            onClick={() => handleLinkClick('Available Artwork')}
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Available Artwork
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => handleLinkClick('About')}
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => handleLinkClick('Gallery')}
            className="text-gray-light hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Gallery
          </NavLink>
          <button
            className="bg-gray-dark text-white rounded-lg py-3 px-8 hover:bg-gray-dark/80"
            onClick={() => {
              onClose();
              onCartOpen();
              trackCartClick('Mobile Cart Button');
            }}
          >
            My Cart - {cart.length} item{cart.length === 1 ? '' : 's'}
          </button>
        </div>
      </div>
    </>
  );
};
