import { getRestDays } from '@/api/calendar';
import { formatRestDays } from '@/utils/calendar/format-rest-days';
import { useSuspenseQuery } from '@tanstack/react-query';

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
