import { getAdmissionDetailsByType } from '@/api/swagger/admission';
import { AdmissionType } from '@/types/admission';
import { useQuery } from '@tanstack/react-query';

export function useAdmissionDetailsQuery(type: AdmissionType) {
  return useQuery({
    queryKey: ['admissionDetails', type],
    queryFn: () => getAdmissionDetailsByType(type),
  });
}
