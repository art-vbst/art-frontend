import { useMemo } from 'react';
import { Artwork } from '@art-vbst/art-types';
import { ArtCard } from '~/pages/art/ArtCard';
import { cn } from '~/utils/cn';

type ArtCardColumnsProps = {
  artworks: Artwork[];
  onClick?: (artwork: Artwork) => void;
  showInfo?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
};

export const ArtCardColumns = ({
  artworks,
  onClick,
  showInfo,
  spacing = 'md',
}: ArtCardColumnsProps) => {
  const artworksWithImages = useMemo(() => {
    return artworks.filter((artwork) => artwork.images.length > 0);
  }, [artworks]);

  const spacingClass = useMemo(() => {
    switch (spacing) {
      case 'sm':
        return 'sm:gap-8';
      case 'md':
        return 'sm:gap-16';
      case 'lg':
        return 'sm:gap-24';
    }
  }, [spacing]);

  const spacingClassString = useMemo(() => {
    return `flex flex-col gap-8 ${spacingClass}`;
  }, [spacingClass]);

  const renderArtwork = (artwork: Artwork) => {
    return (
      <ArtCard
        artwork={artwork}
        onClick={() => onClick?.(artwork)}
        showInfo={showInfo}
      />
    );
  };

  return (
    <div className={cn(spacingClassString, 'sm:flex-row')}>
      <div className={cn(spacingClassString, 'flex-1')}>
        {artworksWithImages.filter((_, i) => i % 2 === 0).map(renderArtwork)}
      </div>
      <div className={cn(spacingClassString, 'flex-1')}>
        {artworksWithImages.filter((_, i) => i % 2 === 1).map(renderArtwork)}
      </div>
    </div>
  );
};
