import { updatePrompt } from '@/api/llm/prompt';
import { toast } from '@/components/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useUpdatePromptMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrompt,
    onSuccess: (_, { question_type, question_category }) => {
      toast.open({ type: 'success', message: '프롬프트가 수정되었습니다.' });
      queryClient.invalidateQueries({ queryKey: ['prompt', question_type, question_category] });
    },
    onError: () => {
      toast.open({ type: 'error', message: '프롬프트 수정에 실패했어요.' });
    },
  });
}

export default useUpdatePromptMutation;
