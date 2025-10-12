import { Link } from 'react-router-dom';
import { PageContainer } from '~/components';

export const HealthCheck = () => {
  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">Status: OK</h2>
      <p className="text-gray-light">You probably didn't mean to come here.</p>
      <Link to="/" className="mt-8">
        Return to the homepage
      </Link>
    </PageContainer>
  );
};
