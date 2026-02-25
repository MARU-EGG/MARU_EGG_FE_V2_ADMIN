import { uploadDocument } from '@/api/llm/documents';
import { toast } from '@/components/toast';
import { UploadDocumentParams } from '@/types/document';
import { useMutation } from '@tanstack/react-query';

function useAdmissionUploadDocuemnt() {
  return useMutation({
    mutationFn: (params: UploadDocumentParams) => uploadDocument(params),
    onSuccess: () => {
      toast.open({ type: 'success', message: '파일 업로드에 성공했어요' });
    },
    onError: () => {
      toast.open({ type: 'error', message: '파일 업로드에 실패했어요' });
    },
  });
}

export default useAdmissionUploadDocuemnt;
