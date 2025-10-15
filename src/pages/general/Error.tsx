import { PageContainer } from '~/components/PageContainer/PageContainer';

export const Error = () => {
  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">An error occurred.</h2>
      <p className="text-gray-light">Please try again later.</p>
    </PageContainer>
  );
};
