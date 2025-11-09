import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Artwork } from '@art-vbst/art-types';
import { ArtDetailInfo } from './ArtDetailInfo';
import { ArtDetailImages } from './ArtDetailImages';

export const ArtDetailContent = ({ artwork }: { artwork: Artwork }) => {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-4 sm:gap-8">
      <Link to="/" className="hidden items-center gap-2 no-underline sm:flex">
        <ChevronLeft />
        <p>Back to Store</p>
      </Link>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-16">
        <div className="flex-2">
          <ArtDetailImages artwork={artwork} />
        </div>
        <div className="flex-1">
          <ArtDetailInfo artwork={artwork} />
        </div>
      </div>
    </div>
  );
};
