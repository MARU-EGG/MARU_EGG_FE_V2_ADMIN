'use client';

import DatePickerTrigger from '@/components/date-picker/date-picker-trigger';
import MiniCalendar from '@/components/date-picker/mini-calendar/mini-calendar';
import { CalendarDay } from '@/types/calendar';
import { useState } from 'react';

type DatePickerProps = {
  value: CalendarDay | null;
  label: string;
  onDateClick: (day: CalendarDay) => void;
};

function DatePicker({ label, value, onDateClick }: DatePickerProps) {
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);

  const handleCalendar = () => {
    setOpenCalendar((prev) => !prev);
  };

  const handleCloseCalendar = () => {
    setOpenCalendar(false);
  };

  return (
    <div className="relative">
      <DatePickerTrigger label={label} handleCalendar={handleCalendar} value={value} />
      {openCalendar && (
        <MiniCalendar handleCloseCalendar={handleCloseCalendar} value={value} onDateClick={onDateClick} />
      )}
    </div>
  );
}

export default DatePicker;
