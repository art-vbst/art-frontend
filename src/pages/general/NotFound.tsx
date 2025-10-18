import { Link } from 'react-router-dom';
import { PageContainer } from '~/components/PageContainer/PageContainer';

export const NotFound = () => {
  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">
        Sorry, this page isn't available.
      </h2>
      <p className="text-gray-light">
        It may have been moved, or it may have never existed at all.
      </p>
      <Link to="/" className="mt-8">
        Go Home
      </Link>
    </PageContainer>
  );
};
