import { getDocuments } from '@/api/llm/documents';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { useQuery } from '@tanstack/react-query';

function useDocumentsQuery({ type, category }: { type: AdmissionLabel; category?: AdmissionCategoryLabel }) {
  return useQuery({
    queryFn: () => getDocuments({ type, category }),
    queryKey: ['documents', type, category],
  });
}

export default useDocumentsQuery;
