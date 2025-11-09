import { Skeleton, SkeletonText } from './Skeleton';

type ArtCardSkeletonProps = {
  showInfo?: boolean;
};

export const ArtCardSkeleton = ({ showInfo = true }: ArtCardSkeletonProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Image skeleton with typical art aspect ratio */}
      <Skeleton aspectRatio="4/3" className="w-full" />

      {showInfo && (
        <>
          {/* Title */}
          <div className="mt-6 w-3/4">
            <SkeletonText className="h-8" />
          </div>

          {/* Price */}
          <div className="mt-2 w-24">
            <SkeletonText className="h-4" />
          </div>
        </>
      )}
    </div>
  );
};
