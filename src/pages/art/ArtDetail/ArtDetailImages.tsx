import * as React from 'react';
import { Artwork, Image } from '~/api/types';
import { ImgWithPlaceholder } from '~/components/ImgWithPlaceholder/ImgWithPlaceholder';
import { cn } from '~/utils/cn';

export const ArtDetailImages = ({ artwork }: { artwork: Artwork }) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  function renderSubImage(image: Image, index: number) {
    return (
      <div
        key={index}
        className="relative flex w-[60px] cursor-pointer sm:w-[80px]"
        onClick={() => setSelectedImageIndex(index)}
      >
        <ImgWithPlaceholder image={image} alt={artwork.title}>
          <div
            className={cn(
              'absolute top-0 left-0 h-full w-full bg-white/50 transition-opacity duration-200 hover:opacity-50',
              selectedImageIndex === index && 'bg-transparent',
            )}
          />
        </ImgWithPlaceholder>
      </div>
    );
  }

  function renderMainImage() {
    return (
      <ImgWithPlaceholder
        image={artwork.images[selectedImageIndex]}
        alt={artwork.title}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row lg:flex-row-reverse">
      {renderMainImage()}
      <div className="flex flex-row gap-2 sm:flex-col">
        {artwork.images.map((image, index) => renderSubImage(image, index))}
      </div>
    </div>
  );
};
