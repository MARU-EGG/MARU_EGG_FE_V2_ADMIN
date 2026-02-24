import { getDocuments } from '@/api/llm/documents';
import { getAdmissionsStatus } from '@/api/swagger/admission';
import AdmissionActiveClient from '@/app/(dashboard)/admission-active/admission-active-client';
import { QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function AdmissionActive() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['admissionsStatus'],
      queryFn: getAdmissionsStatus,
    }),
    queryClient.prefetchQuery({
      queryKey: ['documents', '수시'],
      queryFn: () => getDocuments({ type: '수시' }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdmissionActiveClient />
    </HydrationBoundary>
  );
}
