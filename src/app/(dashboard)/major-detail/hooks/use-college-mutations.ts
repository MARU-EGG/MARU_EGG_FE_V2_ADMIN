'use client';

import { createCollege, deleteCollege, updateCollege } from '@/api/swagger/colleges';
import { toast } from '@/components/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCollegeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCollege,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '대학이 추가되었어요' });
      queryClient.refetchQueries({ queryKey: ['colleges'] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '대학 추가에 실패했어요' });
    },
  });
}

export function useUpdateCollegeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCollege,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '대학 정보가 수정되었어요' });
      queryClient.refetchQueries({ queryKey: ['colleges'] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '대학 수정에 실패했어요' });
    },
  });
}

export function useDeleteCollegeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollege,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '대학이 삭제되었어요' });
      queryClient.refetchQueries({ queryKey: ['colleges'] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '대학 삭제에 실패했어요' });
    },
  });
}
