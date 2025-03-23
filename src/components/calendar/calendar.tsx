'use client';

import CalendarBody from '@/components/calendar/body/calendar-body';
import { CalendarContext } from '@/components/calendar/context/calendar-context';
import CalendarHeader from '@/components/calendar/header/calendar-header';
import { useCalendar } from '@/hooks/calendar/use-calendar-hook';
import { CalendarDay } from '@/types/calendar';

type CalendarProps = {
  onDateClick?: (date: CalendarDay) => void;
  restDays?: Record<string, string[]>;
  events?: Record<string, string[]>;
};

function Calendar({ onDateClick, restDays = {}, events = {} }: CalendarProps) {
  const { dateInfo, groupWeek, dispatch, selectedDay, todayDate } = useCalendar();

  return (
    <CalendarContext.Provider
      value={{ dateInfo, groupWeek, dispatch, restDays, events, selectedDay, todayDate, onDateClick }}
    >
      <div className="min-w-[957px] max-w-[1560px]">
        <Calendar.Header />
        <Calendar.Body />
      </div>
    </CalendarContext.Provider>
  );
}

Calendar.Header = CalendarHeader;
Calendar.Body = CalendarBody;

export default Calendar;
