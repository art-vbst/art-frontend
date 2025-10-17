import * as React from 'react';
import { Artwork, Image } from '~/api/types';
import { cn } from '~/utils/cn';

export const ArtDetailImages = ({ artwork }: { artwork: Artwork }) => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  function renderSubImage(image: Image, index: number) {
    return (
      <div
        key={index}
        className="relative flex w-[80px] cursor-pointer"
        onClick={() => setSelectedImageIndex(index)}
      >
        <div className="h-full w-full">
          <img src={image.image_url} alt={artwork.title} className="h-full w-full object-cover" />
        </div>
        <div
          className={cn(
            'absolute top-0 left-0 h-full w-full bg-white/50 transition-[background-color] duration-200 hover:bg-transparent',
            selectedImageIndex === index && 'bg-transparent',
          )}
        />
      </div>
    );
  }

  function renderMainImage() {
    return (
      <div className="w-full">
        <img
          src={artwork.images[selectedImageIndex]?.image_url}
          alt={artwork.title}
          className="block h-auto w-full max-w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="flex w-[80px] flex-col gap-2">
        {artwork.images.map((image, index) => renderSubImage(image, index))}
      </div>
      {renderMainImage()}
    </div>
  );
};
