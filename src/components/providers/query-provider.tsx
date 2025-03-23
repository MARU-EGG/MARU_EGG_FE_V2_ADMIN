'use client';

import getQueryClient from '@/configs/tanstack-query/get-query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryProvider;
