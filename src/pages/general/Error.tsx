import { Button } from '~/components/Button/Button';
import { PageContainer } from '~/components/PageContainer/PageContainer';

export const Error = () => {
  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">An error occurred.</h2>
      <p className="text-gray-light">
        Please try again. If the issue persists, please contact support.
      </p>

      <Button
        className="mt-8"
        onClick={() =>
          (window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`)
        }
      >
        Contact Support
      </Button>
    </PageContainer>
  );
};
