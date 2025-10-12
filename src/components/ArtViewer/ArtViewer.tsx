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
      className="fixed inset-0 bg-white/90 flex items-center justify-center z-50 animate-fadeIn-slow"
      onClick={onClose}
    >
      <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <button className="absolute -top-10 right-2 cursor-pointer" onClick={onClose}>
          <X />
        </button>
        <img
          src={artwork.images[0].image_url}
          alt={artwork.title}
          className="max-w-[90vw] max-h-[80vh]"
        />
        <h2 className="mt-8 text-gray-light">{artwork.title}</h2>
      </div>
    </div>
  );
};
