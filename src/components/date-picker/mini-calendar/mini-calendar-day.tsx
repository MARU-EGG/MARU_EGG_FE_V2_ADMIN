import { useCalendar } from '@/hooks/calendar/use-calendar-hook';
import { CalendarDay, DateInfo } from '@/types/calendar';
import { cn } from '@/utils/style';
import { isSameDay } from 'date-fns';

type MiniCalendarDayProps = {
  dateInfo: DateInfo;
  day: CalendarDay;
  value: CalendarDay | null;
};

function MiniCalendarDay({ dateInfo, day, value }: MiniCalendarDayProps) {
  const { todayDate } = useCalendar();
  const isRestDay = day.dayOfWeek === 0;
  const isCurrentMonth = day.month === dateInfo.month;
  const isSaturday = day.dayOfWeek === 6;
  const dayDate = new Date(Number(day.year), Number(day.month) - 1, Number(day.day));
  const isToday = todayDate === day.date;
  const isSelectedDay = value
    ? isSameDay(dayDate, new Date(Number(value.year), Number(value.month) - 1, Number(value.day)))
    : isToday;

  const style = cn(
    'font-semibold inline-flex items-center justify-center text-monotone-black w-7 h-7 text-center rounded-full text-sm',
    {
      'text-calendar-saturday': isSaturday,
      'text-calendar-sunday': isRestDay,
      'text-grayscale-gray-40': !isCurrentMonth,
      'text-monotone-white bg-primary-maru': isSelectedDay,
    },
  );

  return <span className={style}>{day.day}</span>;
}

export default MiniCalendarDay;
