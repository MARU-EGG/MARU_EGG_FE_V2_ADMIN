import { getPrompt } from '@/api/llm/prompt';
import AdmissionExtraClient from '@/app/(dashboard)/admission-extra/admission-extra-client';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function AdmissionExtra() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['prompt', '수시', '모집요강'],
    queryFn: () => getPrompt({ type: '수시', category: '모집요강' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdmissionExtraClient />
    </HydrationBoundary>
  );
}
