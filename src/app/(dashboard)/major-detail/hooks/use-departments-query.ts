import { getDepartmentsByCollege } from '@/api/swagger/colleges';
import { useQuery } from '@tanstack/react-query';

export function useDepartmentsQuery(collegeId: number | null) {
  return useQuery({
    queryKey: ['departments', collegeId],
    queryFn: () => getDepartmentsByCollege(collegeId!),
    enabled: collegeId !== null,
  });
}
