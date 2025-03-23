'use client';

import { handler } from '@/mocks/handler.mock';
import { Suspense, use } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser.mock').then(async ({ worker }) => {
        if (process.env.NODE_ENV === 'development') {
          await worker.start();
        }
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handler);
        (module as any).hot?.dispose(() => {
          // HMR이슈 해결 코드(next.js 이슈 69098)
          worker.stop();
        });
      })
    : Promise.resolve();

export function MSWProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  use(mockingEnabledPromise);
  return <>{children}</>;
}
