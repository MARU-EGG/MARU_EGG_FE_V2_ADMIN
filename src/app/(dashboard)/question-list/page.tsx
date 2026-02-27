import { getQuestions } from '@/api/questions';
import QuestionListClient from '@/app/(dashboard)/question-list/question-list-client';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function QuestionList() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['questions', 'SUSI'],
    queryFn: () => getQuestions({ type: 'SUSI' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuestionListClient />
    </HydrationBoundary>
  );
}
