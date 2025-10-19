import { X } from 'lucide-react';
import { Artwork } from '@art-vbst/art-types';

type ArtViewerProps = {
  artwork: Artwork | null;
  open: boolean;
  onClose: () => void;
};

export const ArtViewer = ({ artwork, open, onClose }: ArtViewerProps) => {
  if (!open || !artwork) return null;

  return (
    <div
      className="animate-fadeIn-slow fixed inset-0 z-50 flex items-center justify-center bg-white/90"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-2 cursor-pointer"
          onClick={onClose}
        >
          <X />
        </button>
        <img
          src={artwork.images[0].image_url}
          alt={artwork.title}
          className="max-h-[80vh] max-w-[90vw]"
        />
        <h2 className="text-gray-light mt-8">{artwork.title}</h2>
      </div>
    </div>
  );
};
