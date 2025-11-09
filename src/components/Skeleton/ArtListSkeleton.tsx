import { cn } from '~/utils/cn';
import { useResizeListener } from '~/hooks/use-resize-listener';
import { mobileBreakpoint } from '~/utils/breakpoints';
import { ArtCardSkeleton } from './ArtCardSkeleton';

type ArtListSkeletonProps = {
  count?: number;
  showInfo?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
};

export const ArtListSkeleton = ({
  count = 6,
  showInfo = true,
  spacing = 'md',
}: ArtListSkeletonProps) => {
  const isMobile = useResizeListener(`(max-width: ${mobileBreakpoint})`);

  const items = Array.from({ length: count }, (_, i) => i);

  const column1 = items.filter((_, i) => i % 2 === 0);
  const column2 = items.filter((_, i) => i % 2 === 1);

  const spacingClassString = cn(
    'flex flex-col',
    isMobile
      ? 'gap-8'
      : spacing === 'sm'
        ? 'gap-8'
        : spacing === 'md'
          ? 'gap-16'
          : 'gap-24',
  );

  return (
    <div className={cn(spacingClassString, isMobile ? 'flex-col' : 'flex-row')}>
      <div className={cn(spacingClassString, 'flex-1')}>
        {column1.map((i) => (
          <ArtCardSkeleton key={i} showInfo={showInfo} />
        ))}
      </div>
      <div className={cn(spacingClassString, 'flex-1')}>
        {column2.map((i) => (
          <ArtCardSkeleton key={i} showInfo={showInfo} />
        ))}
      </div>
    </div>
  );
};
