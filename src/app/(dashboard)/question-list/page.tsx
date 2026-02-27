import { QuestionListSkeleton } from '@/app/(dashboard)/question-list/_components/question-list-skeleton';
import QuestionListClient from '@/app/(dashboard)/question-list/question-list-client';
import { Suspense } from 'react';

export default function QuestionList() {
  return (
    <Suspense fallback={<QuestionListSkeleton />}>
      <QuestionListClient />
    </Suspense>
  );
}
