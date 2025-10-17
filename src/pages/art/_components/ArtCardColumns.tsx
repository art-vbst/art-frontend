import { useMemo } from 'react';
import { Artwork } from '~/api/types';
import { ArtCard } from '~/pages/art/_components/ArtCard';
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
  const spacingClass = useMemo(() => {
    switch (spacing) {
      case 'sm':
        return 'gap-8';
      case 'md':
        return 'gap-16';
      case 'lg':
        return 'gap-24';
    }
  }, [spacing]);

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
    <div className={cn('flex', spacingClass)}>
      <div className={cn('flex flex-1 flex-col', spacingClass)}>
        {artworks.filter((_, i) => i % 2 === 0).map(renderArtwork)}
      </div>
      <div className={cn('flex flex-1 flex-col', spacingClass)}>
        {artworks.filter((_, i) => i % 2 === 1).map(renderArtwork)}
      </div>
    </div>
  );
};
