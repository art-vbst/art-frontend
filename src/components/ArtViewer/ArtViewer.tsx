import { X } from 'lucide-react';
import { Artwork } from '~/api';

type ArtViewerProps = {
  artwork: Artwork | null;
  open: boolean;
  onClose: () => void;
};

export const ArtViewer = ({ artwork, open, onClose }: ArtViewerProps) => {
  if (!open || !artwork) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-white/90 flex justify-center items-center z-[1000] animate-fadeIn-slow"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute -top-10 right-[10px] flex justify-center items-center cursor-pointer rounded-full"
          onClick={onClose}
        >
          <X />
        </div>
        <div>
          <img
            src={artwork.images[0].image_url}
            alt={artwork.title}
            className="w-full h-full max-w-[90vw] max-h-[80vh]"
          />
        </div>
        <h2 className="text-base font-normal mt-8 text-gray-light">{artwork.title}</h2>
      </div>
    </div>
  );
};
