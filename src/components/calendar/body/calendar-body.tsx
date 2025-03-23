import CalendarDaysGrid from '@/components/calendar/body/calendar-days-grid';
import CalendarWeeks from '@/components/calendar/body/calendar-weeks';

function CalendarBody() {
  return (
    <table className="w-[1032px] min-w-[957px] table-fixed border-separate border-spacing-y-2">
      <CalendarWeeks />
      <CalendarDaysGrid />
    </table>
  );
}

export default CalendarBody;
