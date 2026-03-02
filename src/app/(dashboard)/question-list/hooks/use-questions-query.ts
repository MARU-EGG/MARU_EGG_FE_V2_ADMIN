import { getQuestions } from '@/api/questions';
import type { AdmissionType } from '@/types/admission';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useQuestionsQuery(type: AdmissionType) {
  return useSuspenseQuery({
    queryKey: ['questions', type],
    queryFn: () => getQuestions({ type }),
  });
}
