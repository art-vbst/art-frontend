import * as React from 'react';
import { Artwork, ArtworkModel, ArtworkStatus } from '~/api';
import { useCartStore } from '~/data/stores';

export const useValidateCart = () => {
  const { cart, setCart } = useCartStore();

  const firstLoadRef = React.useRef(true);

  React.useEffect(() => {
    firstLoadRef.current ? loadAndValidateCart() : saveCart();
    firstLoadRef.current = false;
  }, [cart]);

  async function loadAndValidateCart() {
    const cartJSON = localStorage.getItem('cart');

    if (!cartJSON) {
      return;
    }

    const parsedArtworks = JSON.parse(cartJSON);
    const responses = await Promise.all(parsedArtworks.map(validateArtwork));
    const validatedArtworks = responses.filter(Boolean);

    setCart(validatedArtworks);
  }

  async function validateArtwork(localStorageArtwork: Artwork): Promise<Artwork | null> {
    try {
      const artwork = (await ArtworkModel.get(localStorageArtwork.id)).data;
      return artwork.status === ArtworkStatus.Available ? artwork : null;
    } catch (error) {
      return null;
    }
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
