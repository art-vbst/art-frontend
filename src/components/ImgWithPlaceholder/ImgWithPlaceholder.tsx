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
    <div className="relative w-full">
      {!srcLoaded && width && height && (
        <Skeleton className="w-full" aspectRatio={`${width}/${height}`} />
      )}
      <img
        alt={alt}
        src={image.image_url}
        onLoad={() => setSrcLoaded(true)}
        className={cn('w-full object-cover', srcLoaded ? 'block' : 'hidden')}
      />
      {srcLoaded && children}
    </div>
  );
};
