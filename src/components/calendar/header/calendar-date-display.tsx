import { useCalendarContext } from '@/components/calendar/context/calendar-context';

function CalendarDateDisplay() {
  const { dateInfo } = useCalendarContext();

  return (
    <div className="flex items-center gap-2">
      <div className="flex w-14 flex-col items-center rounded-md border-2">
        <span className="w-full bg-grayscale-gray-10 py-1 text-center text-sm font-semibold text-grayscale-gray-60">
          {dateInfo.month}월
        </span>
        <span className="font-bold text-primary-maru">{dateInfo.day}</span>
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">
          {dateInfo.year}년 {dateInfo.month}월
        </span>
        <span className="text-xs font-semibold text-grayscale-gray-60">
          {dateInfo.month}월 1일 ~ {dateInfo.month}월 {dateInfo.lastDayOfMonth}일
        </span>
      </div>
    </div>
  );
}

export default CalendarDateDisplay;
