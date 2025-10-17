import { ArtworkModel } from '~/api/models';
import { ArtCardColumns } from '../_components/ArtCardColumns';
import { useNavigate } from 'react-router';
import { ListPageLoader } from '~/components/ListPageLoader/ListPageLoader';
import { Artwork } from '~/api/types';

export default function ArtList() {
  const navigate = useNavigate();

  function fetchData() {
    return ArtworkModel.list({ status: ['available', 'coming_soon'] });
  }

  function renderContent(artworks: Artwork[]) {
    return (
      <ArtCardColumns
        artworks={artworks}
        onClick={(artwork) => navigate(`/art/${artwork.id}`)}
      />
    );
  }

  return <ListPageLoader fetchData={fetchData} children={renderContent} />;
}
