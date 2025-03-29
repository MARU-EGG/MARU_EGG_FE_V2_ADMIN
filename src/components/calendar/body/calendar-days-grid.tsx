import CalendarDay from '@/components/calendar/body/calendar-day';
import CalendarEvents from '@/components/calendar/body/calendar-events';
import { useCalendarContext } from '@/components/calendar/context/calendar-context';
import { CalendarDay as CalendarDayType } from '@/types/calendar';

function CalendarDaysGrid() {
  const { groupWeek, restDays, events, onDateClick, dispatch } = useCalendarContext();

  const handleDateClick = (day: CalendarDayType) => {
    dispatch.handleSelectedDay(day.date);
    if (onDateClick) {
      onDateClick(day);
    }
  };
  return (
    <tbody>
      {groupWeek.map((week, index) => (
        <tr className="text-center text-grayscale-gray-50" key={index}>
          {week.map((day, dayIndex) => (
            <td className="cursor-pointer align-top" key={dayIndex} onClick={() => handleDateClick(day)}>
              <div className="flex flex-col items-center gap-1">
                <CalendarDay day={day} />
                <CalendarEvents eventsList={restDays} date={day.date} type="REST_DAY" />
                <CalendarEvents eventsList={events} date={day.date} type="EVENT" />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default CalendarDaysGrid;
