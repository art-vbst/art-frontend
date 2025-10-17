import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Artwork } from '~/api/types';
import { ArtDetailInfo } from './Info';
import { ArtDetailImages } from './Images';

export const ArtDetailContent = ({ artwork }: { artwork: Artwork }) => {
  return (
    <div className="flex w-full max-w-6xl flex-col gap-8">
      <Link to="/" className="flex items-center gap-2 text-sm no-underline">
        <ChevronLeft />
        <p>Back to Store</p>
      </Link>
      <div className="flex w-full gap-16">
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
