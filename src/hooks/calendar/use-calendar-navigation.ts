import { addMonths, subMonths } from 'date-fns';
import { useState } from 'react';

export function useCalendarNavigation() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return { currentDate, handlePrevMonth, handleNextMonth };
}
