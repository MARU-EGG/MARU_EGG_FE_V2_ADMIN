import { getColleges } from '@/api/swagger/colleges';
import { useQuery } from '@tanstack/react-query';

export function useCollegesQuery() {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });
}
