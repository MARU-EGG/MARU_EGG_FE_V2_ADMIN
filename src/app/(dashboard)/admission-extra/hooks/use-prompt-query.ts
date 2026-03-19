import { getPrompt } from '@/api/llm/prompt';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { useQuery } from '@tanstack/react-query';

function usePromptQuery({ type, category }: { type: AdmissionLabel; category: AdmissionCategoryLabel }) {
  return useQuery({
    queryKey: ['prompt', type, category],
    queryFn: () => getPrompt({ type, category }),
  });
}

export default usePromptQuery;
