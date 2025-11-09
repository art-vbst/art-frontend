import { cn } from '~/utils/cn';

type SkeletonProps = {
  className?: string;
  width?: string;
  height?: string;
  aspectRatio?: string;
};

export const Skeleton = ({ className, width, height, aspectRatio }: SkeletonProps) => {
  return (
    <div
      className={cn(
        'before:animate-shimmer relative overflow-hidden bg-gray-200 before:absolute before:top-0 before:-left-full before:h-full before:w-1/2 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:content-[\'\']',
        className
      )}
      style={{ 
        width, 
        height,
        aspectRatio 
      }}
    />
  );
};

export const SkeletonText = ({ 
  className, 
  width = '100%' 
}: { 
  className?: string; 
  width?: string;
}) => {
  return (
    <Skeleton 
      className={cn('rounded', className)} 
      width={width} 
      height="1em" 
    />
  );
};

export const SkeletonCircle = ({ 
  size = '40px',
  className 
}: { 
  size?: string;
  className?: string;
}) => {
  return (
    <Skeleton 
      className={cn('rounded-full', className)} 
      width={size} 
      height={size} 
    />
  );
};

