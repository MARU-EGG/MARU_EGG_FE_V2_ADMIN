import { getColleges } from '@/api/swagger/colleges';
import MajorDetailClient from '@/app/(dashboard)/major-detail/major-detail-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

export default async function MajorDetail() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MajorDetailClient />
    </HydrationBoundary>
  );
}
