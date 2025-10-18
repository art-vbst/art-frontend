import * as React from 'react';
import { ArtworkModel } from '~/api/models';
import { Artwork } from '~/api/types';
import { ListPageLoader } from '~/components/ListPageLoader/ListPageLoader';
import { ArtCardColumns } from '../ArtCardColumns';
import { ArtViewer } from './ArtViewer';

export default function Gallery() {
  const [openArtwork, setOpenArtwork] = React.useState<Artwork | null>(null);

  function fetchData() {
    return ArtworkModel.list();
  }

  function renderContent(artworks: Artwork[]) {
    return (
      <>
        <ArtCardColumns
          artworks={artworks}
          onClick={(artwork) => setOpenArtwork(artwork)}
          showInfo={false}
          spacing="sm"
        />
        <ArtViewer
          artwork={openArtwork}
          open={!!openArtwork}
          onClose={() => setOpenArtwork(null)}
        />
      </>
    );
  }

  return <ListPageLoader fetchData={fetchData} children={renderContent} />;
}
