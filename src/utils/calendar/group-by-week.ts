import { CalendarDay } from '@/types/calendar';

export function groupByWeek(formatCurrentMonthDays: CalendarDay[]) {
  let weeks: CalendarDay[][] = [];
  let currentWeek: CalendarDay[] = [];

  formatCurrentMonthDays.forEach((day) => {
    currentWeek.push(day);
    if (day.dayOfWeek === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return weeks;
}
