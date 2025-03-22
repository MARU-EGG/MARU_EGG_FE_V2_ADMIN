import { CalendarDay, DateInfo } from '@/types/calendar';
import { createContext, useContext } from 'react';

type CalendarContextType = {
  dateInfo: DateInfo;
  groupWeek: CalendarDay[][];
  selectedDay: string;
  todayDate: string;
  dispatch: {
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    handleSelectedDay: (day: string) => void;
  };
  restDays: Record<string, string[]>;
  events: Record<string, string[]>;
  onDateClick?: (date: CalendarDay) => void;
};

export const CalendarContext = createContext<CalendarContextType | null>(null);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('calendar context does not exist');
  }
  return context;
}
