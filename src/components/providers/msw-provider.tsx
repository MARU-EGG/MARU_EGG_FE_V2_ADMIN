'use client';

import { handler } from '@/mocks/handlers/index.mock';
import { Suspense, use } from 'react';

const mockingEnabledPromise =
  typeof window !== 'undefined'
    ? import('@/mocks/browser.mock').then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes('_next')) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handler);
        if (typeof module !== 'undefined') {
          // HMR이슈 해결 코드(next.js 이슈 69098)
          (module as any).hot?.dispose(() => {
            worker.stop();
          });
        }
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
