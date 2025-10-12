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
    <div className="max-[720px]:fixed max-[720px]:top-0 max-[720px]:left-0 max-[720px]:w-full max-[720px]:z-[100] max-[720px]:shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="Navbar bg-white py-10 pb-[50px] flex flex-col items-center gap-9 relative z-[100] max-[720px]:py-8">
        <h1 className="text-[32px] font-semibold text-center max-[720px]:text-[28px] max-[480px]:self-start max-[480px]:text-left max-[480px]:pl-4 max-[480px]:text-[22px] max-[340px]:text-[20px]">
          Stephanie Bee Studio
        </h1>
        <div className="flex items-center gap-11 max-[720px]:hidden">
          <NavLink
            to="/"
            onClick={() => trackNavClick('Available Artwork')}
            className="font-mono text-sm text-gray-light no-underline transition-colors duration-100 select-none hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Available Artwork
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => trackNavClick('About')}
            className="font-mono text-sm text-gray-light no-underline transition-colors duration-100 select-none hover:text-gray-dark [&.active]:text-gray-dark"
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => trackNavClick('Gallery')}
            className="font-mono text-sm text-gray-light no-underline transition-colors duration-100 select-none hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Gallery
          </NavLink>
        </div>
        <button
          className="bg-transparent border-none cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 hidden items-center justify-center z-[999] max-[720px]:flex"
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
      <div
        className="fixed top-0 left-0 w-full h-screen z-[90] bg-black/50 animate-fadeIn"
        onClick={onClose}
      />
      <div className="absolute top-full left-0 w-full z-[99] flex flex-col animate-slideFromTop">
        <div className="shadow-[0_4px_16px_rgba(0,0,0,0.2)] bg-white relative flex flex-col items-center gap-6 py-2 px-4 pb-8 font-mono">
          <NavLink
            to="/"
            onClick={() => handleLinkClick('Available Artwork')}
            className="text-gray-light no-underline text-base transition-colors duration-200 select-none hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Available Artwork
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => handleLinkClick('About')}
            className="text-gray-light no-underline text-base transition-colors duration-200 select-none hover:text-gray-dark [&.active]:text-gray-dark"
          >
            About
          </NavLink>
          <NavLink
            to="/gallery"
            onClick={() => handleLinkClick('Gallery')}
            className="text-gray-light no-underline text-base transition-colors duration-200 select-none hover:text-gray-dark [&.active]:text-gray-dark"
          >
            Gallery
          </NavLink>
          <button
            className="bg-gray-dark border-none rounded-lg py-3 px-8 cursor-pointer text-white text-base font-[inherit] transition-all duration-200 hover:bg-gray-dark/80"
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
