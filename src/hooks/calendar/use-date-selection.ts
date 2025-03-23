import { useState } from 'react';

export function useDateSelection() {
  const [selectedDay, setSelectedDay] = useState<string>('');

  const handleSelectedDay = (day: string) => {
    setSelectedDay(day);
  };

  return { selectedDay, handleSelectedDay };
}
