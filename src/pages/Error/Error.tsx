import * as Sentry from '@sentry/react';
import { PageContainer } from '~/components';

export const Error = () => {
  return (
    <PageContainer>
      <h2 className="text-[22px] font-semibold">An error occurred.</h2>
      <p className="text-base text-gray-light">Please try again later.</p>
      <button
        className="mt-8 py-3 px-6 border-none rounded bg-gray-dark text-white cursor-pointer"
        onClick={() => Sentry.showReportDialog()}
      >
        Report feedback
      </button>
    </PageContainer>
  );
};
