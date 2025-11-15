import React from 'react';
import { Image } from '@art-vbst/art-types';
import { cn } from '~/utils/cn';
import { Skeleton } from '../Skeleton/Skeleton';

type ImgWithPlaceholderProps = {
  image: Image;
  alt: string;
  children?: React.ReactNode;
};

export const ImgWithPlaceholder = ({
  image,
  alt,
  children,
}: ImgWithPlaceholderProps) => {
  const width = image.image_width;
  const height = image.image_height;
  const [srcLoaded, setSrcLoaded] = React.useState(false);

  return (
    <div
      className="relative w-full"
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <Skeleton className="absolute inset-0 -z-1 h-full w-full" />
      <img
        alt={alt}
        src={image.image_url}
        onLoad={() => setSrcLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-150',
          srcLoaded ? 'opacity-100' : 'opacity-0',
        )}
      />
      {srcLoaded && children}
    </div>
  );
};
