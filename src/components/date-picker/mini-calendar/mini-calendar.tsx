import CalendarWeeks from '@/components/calendar/body/calendar-weeks';
import MiniCalendarDay from '@/components/date-picker/mini-calendar/mini-calendar-day';
import MiniCalendarHeader from '@/components/date-picker/mini-calendar/mini-calendar-header';
import { useCalendar } from '@/hooks/calendar/use-calendar-hook';
import { CalendarDay } from '@/types/calendar';

type MiniCalendarProps = {
  onDateClick: (day: CalendarDay) => void;
  value: CalendarDay | null;
  handleCloseCalendar: () => void;
};

function MiniCalendar({ handleCloseCalendar, value, onDateClick }: MiniCalendarProps) {
  const { groupWeek, dateInfo, dispatch } = useCalendar();

  const handleDayClick = (day: CalendarDay) => {
    onDateClick(day);
    handleCloseCalendar();
  };

  return (
    <div className="absolute top-12 h-64 w-60 rounded-md border border-grayscale-gray-20 bg-white px-1 py-1 shadow-md">
      <MiniCalendarHeader
        dateInfo={dateInfo}
        handlePrevMonth={dispatch.handlePrevMonth}
        handleNextMonth={dispatch.handleNextMonth}
      />
      <table className="w-full">
        <CalendarWeeks></CalendarWeeks>
        <tbody>
          {groupWeek.map((week, index) => (
            <tr className="text-center text-grayscale-gray-50" key={index}>
              {week.map((day, dayIndex) => (
                <td className="cursor-pointer align-top" key={dayIndex} onClick={() => handleDayClick(day)}>
                  <MiniCalendarDay dateInfo={dateInfo} day={day} value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MiniCalendar;
