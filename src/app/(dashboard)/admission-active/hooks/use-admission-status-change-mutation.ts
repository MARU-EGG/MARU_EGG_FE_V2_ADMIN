import { changeAdmissionStatus } from '@/api/swagger/admission';
import { AdmissionType } from '@/types/admission';
import { useMutation } from '@tanstack/react-query';

export function useAdmissionStatusChangeMutation() {
  const mutate = useMutation({
    mutationFn: (admissionStatus: AdmissionType) => changeAdmissionStatus(admissionStatus),
  });

  return mutate;
}
