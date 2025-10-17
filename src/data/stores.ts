import { create } from 'zustand';
import { Artwork } from '~/api/types';

type CartStore = {
  cart: Artwork[];
  isCartOpen: boolean;
  setCart: (cart: Artwork[]) => void;
  setIsCartOpen: (isCartOpen: boolean) => void;
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (productId: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  isCartOpen: false,
  setCart: (cart: Artwork[]) => {
    set({ cart });
  },
  setIsCartOpen: (isCartOpen: boolean) => {
    set({ isCartOpen });
  },
  addToCart: (product) => {
    set((state) => ({ cart: [...state.cart, product] }));
  },
  removeFromCart: (productId: string) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },
}));
