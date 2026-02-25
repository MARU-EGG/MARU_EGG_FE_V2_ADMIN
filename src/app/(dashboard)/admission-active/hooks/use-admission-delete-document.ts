import { deleteDocument } from '@/api/llm/documents';
import { toast } from '@/components/toast';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { useMutation } from '@tanstack/react-query';

function useAdmissionDeleteDocument() {
  return useMutation({
    mutationFn: ({ type, category }: { type: AdmissionLabel; category: AdmissionCategoryLabel }) =>
      deleteDocument({ type, category }),
    onSuccess: () => {
      toast.open({ type: 'success', message: '파일 삭제에 성공했어요' });
    },
    onError: () => {
      toast.open({ type: 'error', message: '파일 삭제에 실패했어요' });
    },
  });
}

export default useAdmissionDeleteDocument;
