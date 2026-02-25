import { changeAdmissionStatus } from '@/api/swagger/admission';
import { toast } from '@/components/toast';
import { ADMISSIONS, AdmissionType } from '@/types/admission';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAdmissionStatusChangeMutation() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: (admissionStatus: AdmissionType) => changeAdmissionStatus(admissionStatus),
    onSuccess: (_, admissionType) => {
      toast.open({
        type: 'success',
        position: 'top-center',
        message: `${ADMISSIONS[admissionType]} 상태가 변경되었어요`,
      });
      queryClient.refetchQueries({ queryKey: ['admissionsStatus'] });
    },
    onError: (_, admissionType) => {
      toast.open({
        type: 'error',
        position: 'top-center',
        message: `${ADMISSIONS[admissionType]} 상태 변경에 실패했어요`,
      });
    },
  });

  return mutate;
}
