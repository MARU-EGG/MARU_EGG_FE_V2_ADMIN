import { CalendarDay } from '@/types/calendar';
import { eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, startOfMonth, startOfWeek } from 'date-fns';

export function getMonthDays(currentDate: Date) {
  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);
  const startOfFirstWeek = startOfWeek(startCurrentMonth, { weekStartsOn: 0 });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  const currentMonthDays = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  const formatCurrentMonthDays: CalendarDay[] = currentMonthDays.map((day) => ({
    date: format(day, 'yyyy-M-dd'),
    year: format(day, 'yyyy'),
    month: format(day, 'M'),
    day: format(day, 'd'),
    dayOfWeek: getDay(day),
  }));

  return formatCurrentMonthDays;
}
