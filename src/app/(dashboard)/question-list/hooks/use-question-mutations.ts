'use client';

import { deleteQuestion, editAnswer, editQuestion, verifyQA } from '@/api/questions';
import { toast } from '@/components/toast';
import type { QuestionItem } from '@/types/questions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditQuestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editQuestion,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '질문이 수정되었어요' });
      queryClient.refetchQueries({ queryKey: ['questions'] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '질문 수정에 실패했어요' });
    },
  });
}

export function useEditAnswerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editAnswer,
    onMutate: async ({ id, content }) => {
      await queryClient.cancelQueries({ queryKey: ['questions'] });
      const previousQueries = queryClient.getQueriesData<QuestionItem[]>({ queryKey: ['questions'] });
      queryClient.setQueriesData<QuestionItem[]>({ queryKey: ['questions'] }, (old) =>
        old?.map((q) => (q.answer?.id === id ? { ...q, answer: { ...q.answer, content } } : q)),
      );
      return { previousQueries };
    },
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '답변이 수정되었어요' });
    },
    onError: (_err, _vars, context) => {
      context?.previousQueries.forEach(([key, data]) =>
        queryClient.setQueryData<QuestionItem[]>(key, data),
      );
      toast.open({ type: 'error', position: 'top-center', message: '답변 수정에 실패했어요' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useDeleteQuestionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '질문이 삭제되었어요' });
      queryClient.refetchQueries({ queryKey: ['questions'] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '질문 삭제에 실패했어요' });
    },
  });
}

export function useVerifyQAMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: verifyQA,
    onMutate: async ({ questionId }) => {
      await queryClient.cancelQueries({ queryKey: ['questions'] });
      const previousQueries = queryClient.getQueriesData<QuestionItem[]>({ queryKey: ['questions'] });
      queryClient.setQueriesData<QuestionItem[]>({ queryKey: ['questions'] }, (old) =>
        old?.map((q) => (q.id === questionId ? { ...q, isChecked: !q.isChecked } : q)),
      );
      return { previousQueries };
    },
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '확인 상태가 변경되었어요' });
    },
    onError: (_err, _vars, context) => {
      context?.previousQueries.forEach(([key, data]) =>
        queryClient.setQueryData<QuestionItem[]>(key, data),
      );
      toast.open({ type: 'error', position: 'top-center', message: '확인 상태 변경에 실패했어요' });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
