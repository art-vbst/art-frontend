import { Skeleton, SkeletonText } from './Skeleton';

export const ArtDetailSkeleton = () => {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-4 sm:gap-8">
      {/* Back button skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton width="80px" height="20px" className="rounded" />
      </div>

      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-16">
        {/* Images section skeleton */}
        <div className="flex-2">
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-row-reverse">
            {/* Main image */}
            <Skeleton aspectRatio="4/3" className="w-full" />

            {/* Thumbnail images */}
            <div className="flex flex-row gap-2 sm:flex-col">
              <Skeleton aspectRatio="1" className="w-[60px] sm:w-[80px]" />
              <Skeleton aspectRatio="1" className="w-[60px] sm:w-[80px]" />
            </div>
          </div>
        </div>

        {/* Info section skeleton */}
        <div className="flex w-1/2 flex-1 flex-col gap-6 lg:w-full">
          <Skeleton className="h-6 w-3/4" />

          {/* Description */}
          <div className="w-full space-y-4">
            <SkeletonText className="w-3/4" />
            <SkeletonText className="w-3/4" />
            <SkeletonText className="w-1/2" />
          </div>

          {/* Add to cart button */}
          <Skeleton height="48px" className="w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
};
