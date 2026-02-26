'use client';

import { createDepartment, deleteDepartment, updateDepartment } from '@/api/swagger/colleges';
import { toast } from '@/components/toast';
import { DepartmentParams } from '@/types/college';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateDepartmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: (_, variables) => {
      toast.open({ type: 'success', position: 'top-center', message: '학과가 추가되었어요' });
      queryClient.refetchQueries({ queryKey: ['departments', variables.collegeId] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '학과 추가에 실패했어요' });
    },
  });
}

export function useUpdateDepartmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      departmentId,
      params,
    }: {
      departmentId: string;
      params: Omit<DepartmentParams, 'collegeId'>;
      collegeId: number;
    }) => updateDepartment({ departmentId, params }),
    onSuccess: (_, variables) => {
      toast.open({ type: 'success', position: 'top-center', message: '학과 정보가 수정되었어요' });
      queryClient.refetchQueries({ queryKey: ['departments', variables.collegeId] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '학과 수정에 실패했어요' });
    },
  });
}

export function useDeleteDepartmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ departmentId }: { departmentId: number; collegeId: number }) => deleteDepartment(departmentId),
    onSuccess: (_, variables) => {
      toast.open({ type: 'success', position: 'top-center', message: '학과가 삭제되었어요' });
      queryClient.refetchQueries({ queryKey: ['departments', variables.collegeId] });
    },
    onError: () => {
      toast.open({ type: 'error', position: 'top-center', message: '학과 삭제에 실패했어요' });
    },
  });
}
