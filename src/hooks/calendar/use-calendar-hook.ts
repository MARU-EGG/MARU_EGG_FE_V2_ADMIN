import { useCalendarNavigation } from '@/hooks/calendar/use-calendar-navigation';
import { useDateSelection } from '@/hooks/calendar/use-date-selection';
import { CalendarDay } from '@/types/calendar';
import { getMonthDays } from '@/utils/calendar/get-month-days';
import { groupByWeek } from '@/utils/calendar/group-by-week';
import { endOfMonth, format } from 'date-fns';
import { useEffect } from 'react';

export function useCalendar(targetDate?: string | null) {
  const { currentDate, handlePrevMonth, handleNextMonth } = useCalendarNavigation(targetDate);
  const { selectedDay, handleSelectedDay } = useDateSelection();

  const [currentYear, currentMonth, currentDay] = format(currentDate, 'yyyy-M-d').split('-');

  const todayDate = format(new Date(), 'yyyy-M-dd');
  const monthDays = getMonthDays(currentDate);
  const groupWeek = groupByWeek(monthDays);

  useEffect(() => {
    handleSelectedDay('');
  }, [currentDate]);

  return {
    dateInfo: {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      lastDayOfMonth: format(endOfMonth(currentDate), 'd'),
    },
    dispatch: {
      handlePrevMonth,
      handleNextMonth,
      handleSelectedDay,
    },
    groupWeek,
    selectedDay,
    todayDate,
  };
}
