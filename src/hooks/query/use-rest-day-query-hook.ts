import { getRestDays } from '@/api/calendar';
import { formatRestDays } from '@/utils/format-rest-days';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

function useRestDayQuery(year: string) {
  const { data } = useSuspenseQuery({
    queryKey: ['REST_DAYS', year],
    queryFn: () => getRestDays(year),
    select: (data) => {
      return formatRestDays(data.response.body.items.item);
    },
  });
  return { data };
}

export default useRestDayQuery;
