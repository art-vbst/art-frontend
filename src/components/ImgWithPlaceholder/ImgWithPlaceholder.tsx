import React from 'react';
import { Image } from '@art-vbst/art-types';
import { cn } from '~/utils/cn';
import { ShimmerPlaceholder } from '../ShimmerPlaceholder/ShimmerPlaceholder';

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
        <ShimmerPlaceholder width={width} height={height} />
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
