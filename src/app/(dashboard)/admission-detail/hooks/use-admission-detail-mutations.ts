'use client';

import {
  createAdmissionsDetail,
  deleteAdmissionDetail,
  updateAdmissionDetail,
} from '@/api/swagger/admission';
import { toast } from '@/components/toast';
import { AdmissionType } from '@/types/admission';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateAdmissionDetailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmissionsDetail,
    onSuccess: (_, variables) => {
      toast.open({ type: 'success', position: 'top-center', message: '상세 타입이 추가되었어요' });
      queryClient.refetchQueries({ queryKey: ['admissionDetails', variables.type] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '상세 타입 추가에 실패했어요' });
    },
  });
}

export function useUpdateAdmissionDetailMutation(type: AdmissionType) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdmissionDetail,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '상세 타입이 수정되었어요' });
      queryClient.refetchQueries({ queryKey: ['admissionDetails', type] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '상세 타입 수정에 실패했어요' });
    },
  });
}

export function useDeleteAdmissionDetailMutation(type: AdmissionType) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmissionDetail,
    onSuccess: () => {
      toast.open({ type: 'success', position: 'top-center', message: '상세 타입이 삭제되었어요' });
      queryClient.refetchQueries({ queryKey: ['admissionDetails', type] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '상세 타입 삭제에 실패했어요' });
    },
  });
}
