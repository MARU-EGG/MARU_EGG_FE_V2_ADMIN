import CalendarActionButtons from '@/components/calendar/header/calendar-action-buttons';
import CalendarDateDisplay from '@/components/calendar/header/calendar-date-display';

function CalendarHeader() {
  return (
    <div className="mb-3 flex items-center justify-between">
      <CalendarDateDisplay />
      <CalendarActionButtons />
    </div>
  );
}

export default CalendarHeader;
