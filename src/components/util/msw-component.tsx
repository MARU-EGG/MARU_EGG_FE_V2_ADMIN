'use client';

import { useEffect } from 'react';

export const MswComponent = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (typeof window === 'undefined') {
        (async () => {
          const { server } = await import('@/mocks/server.mock');
          server.listen();
        })();
      } else {
        (async () => {
          const { worker } = await import('@/mocks/browser.mock');
          worker.start();
        })();
      }
    }
  });

  return null;
};
