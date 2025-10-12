import { Link } from 'react-router-dom';
import { PageContainer } from '~/components';

export const NotFound = () => {
  return (
    <PageContainer>
      <h2 className="text-[22px] font-semibold">Sorry, this page isn't available.</h2>
      <p className="text-base text-gray-light">
        It may have been moved, or it may have never existed at all.
      </p>
      <Link to="/" className="mt-8">
        Go Home
      </Link>
    </PageContainer>
  );
};
