import * as Sentry from '@sentry/react';
import { PageContainer } from '~/components';

export const Error = () => {
  return (
    <PageContainer>
      <h2 className="text-xl font-semibold">An error occurred.</h2>
      <p className="text-gray-light">Please try again later.</p>
      <button
        className="bg-gray-dark mt-8 rounded px-6 py-3 text-white"
        onClick={() => Sentry.showReportDialog()}
      >
        Report feedback
      </button>
    </PageContainer>
  );
};
