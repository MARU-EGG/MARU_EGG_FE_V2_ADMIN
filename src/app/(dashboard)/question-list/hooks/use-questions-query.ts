import { getQuestions } from '@/api/questions';
import type { AdmissionType } from '@/types/admission';
import { useQuery } from '@tanstack/react-query';

export function useQuestionsQuery(type: AdmissionType) {
  return useQuery({
    queryKey: ['questions', type],
    queryFn: () => getQuestions({ type }),
  });
}
