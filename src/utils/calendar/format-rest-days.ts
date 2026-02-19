import { RestDayItem } from '@/types/calendar';
import { format, parse } from 'date-fns';

export function formatRestDays(restDays: RestDayItem[]) {
  const formattedRestDays: Record<string, string[]> = {};

  restDays.forEach((restDay) => {
    const dateKey = formatLocdate(restDay.locdate);

    if (!formattedRestDays[dateKey]) {
      formattedRestDays[dateKey] = [];
    }
    formattedRestDays[dateKey].push(restDay.dateName);
  });

  return formattedRestDays;
}

function formatLocdate(locdate: number) {
  const locdateStr = locdate.toString();
  const date = parse(locdateStr, 'yyyyMdd', new Date());
  return format(date, 'yyyy-M-dd');
}
