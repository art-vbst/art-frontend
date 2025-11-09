import { useMemo } from 'react';
import { Artwork } from '@art-vbst/art-types';
import { ArtCard } from '~/pages/art/ArtCard';
import { cn } from '~/utils/cn';
import { useResizeListener } from '~/hooks/use-resize-listener';
import { mobileBreakpoint } from '~/utils/breakpoints';

type ArtCardColumnsProps = {
  artworks: Artwork[];
  onClick?: (artwork: Artwork) => void;
  showInfo?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
};

export const ArtCardColumns = ({
  artworks: unfilteredArtworks,
  onClick,
  showInfo,
  spacing = 'md',
}: ArtCardColumnsProps) => {
  const isMobile = useResizeListener(`(max-width: ${mobileBreakpoint})`);

  const artworks = useMemo(() => {
    return unfilteredArtworks.filter((artwork) => artwork.images.length > 0);
  }, [unfilteredArtworks]);

  const getAspectRatio = (artwork: Artwork): number => {
    const image = artwork.images[0];
    if (!image?.image_height || !image?.image_width) return 0;
    return image.image_height / image.image_width;
  };

  const columnAssignments = useMemo(() => {
    if (isMobile) {
      return { column1: artworks, column2: [] };
    }

    const column1: Artwork[] = [];
    const column2: Artwork[] = [];

    let column1Height = 0;
    let column2Height = 0;

    artworks.forEach((artwork) => {
      const aspectRatio = getAspectRatio(artwork);

      if (column1Height <= column2Height) {
        column1.push(artwork);
        column1Height += aspectRatio;
      } else {
        column2.push(artwork);
        column2Height += aspectRatio;
      }
    });

    return { column1, column2 };
  }, [artworks, isMobile]);

  const spacingClassString = useMemo(() => {
    const base = 'flex flex-col';

    if (isMobile) {
      return cn(base, 'gap-8');
    }

    switch (spacing) {
      case 'sm':
        return cn(base, 'gap-8');
      case 'md':
        return cn(base, 'gap-16');
      case 'lg':
        return cn(base, 'gap-24');
    }
  }, [spacing, isMobile]);

  const renderArtwork = (artwork: Artwork) => {
    return (
      <ArtCard
        key={artwork.id}
        artwork={artwork}
        onClick={() => onClick?.(artwork)}
        showInfo={showInfo}
      />
    );
  };

  return (
    <div className={cn(spacingClassString, isMobile ? 'flex-col' : 'flex-row')}>
      <div className={cn(spacingClassString, 'flex-1')}>
        {columnAssignments.column1.map(renderArtwork)}
      </div>
      {!isMobile && (
        <div className={cn(spacingClassString, 'flex-1')}>
          {columnAssignments.column2.map(renderArtwork)}
        </div>
      )}
    </div>
  );
};
