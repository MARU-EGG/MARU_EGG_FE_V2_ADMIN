import { uploadDocuments } from '@/api/llm/documents';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { useMutation } from '@tanstack/react-query';

export function useDocumentUploadMutation() {
  return useMutation({
    mutationFn: ({
      type,
      category,
      files,
    }: {
      type: AdmissionLabel;
      category: AdmissionCategoryLabel;
      files: File[];
    }) => uploadDocuments({ type, category, files }),
  });
}
