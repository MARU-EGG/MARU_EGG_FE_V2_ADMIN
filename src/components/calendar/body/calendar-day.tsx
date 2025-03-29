import { useCalendarContext } from '@/components/calendar/context/calendar-context';
import { CalendarDay as CalendarDayType, DateInfo } from '@/types/calendar';
import { cn } from '@/utils/style';

type DayProps = {
  day: CalendarDayType;
};

function CalendarDay({ day }: DayProps) {
  const { restDays, dateInfo, selectedDay, todayDate } = useCalendarContext();
  const isCurrentMonth = day.month === dateInfo.month;
  const isRestDay = day.dayOfWeek === 0 || restDays[day.date];
  const isSaturday = day.dayOfWeek === 6;
  const isWeekday = !isRestDay && !isSaturday;
  const isToday = day.date === todayDate;
  const isSelectedDay = selectedDay === day.date;

  const style = cn(
    'font-semibold inline-flex items-center justify-center text-monotone-black w-7 h-7 text-center rounded-full',
    {
      'text-calendar-saturday': isSaturday,
      'text-calendar-sunday': isRestDay,
      'text-grayscale-gray-40': !isCurrentMonth,

      'text-monotone-white bg-primary-maru': isToday && isWeekday,
      'text-monotone-white bg-calendar-saturday': isToday && isSaturday,
      'text-monotone-white bg-calendar-sunday': isToday && isRestDay,

      'border-2 border-primary-maru text-primary-maru ': isSelectedDay && isWeekday,
      'border-2 border-calendar-saturday text-calendar-saturday ': isSelectedDay && isSaturday,
      'border-2 border-calendar-sunday text-calendar-sunday ': isSelectedDay && isRestDay,

      'border-2 border-primary-maru text-monotone-white outline outline-primary-maru outline-offset-2':
        isSelectedDay && isWeekday && isToday,
      'border-2 border-calendar-saturday text-monotone-white outline outline-calendar-saturday outline-offset-2':
        isSelectedDay && isSaturday && isToday,
      'border-2 border-calendar-sunday text-monotone-white outline outline-calendar-sunday outline-offset-2':
        isSelectedDay && isRestDay && isToday,
    },
  );

  return <span className={style}>{day.day}</span>;
}

export default CalendarDay;
