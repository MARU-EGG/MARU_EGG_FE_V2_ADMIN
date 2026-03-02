import { getAdmissionDetailsByType } from '@/api/swagger/admission';
import AdmissionDetailClient from '@/app/(dashboard)/admission-detail/admission-detail-client';
import { QueryClient } from '@tanstack/react-query';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

export default async function AdmissionDetail() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['admissionDetails', 'SUSI'],
    queryFn: () => getAdmissionDetailsByType('SUSI'),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdmissionDetailClient />
    </HydrationBoundary>
  );
}
