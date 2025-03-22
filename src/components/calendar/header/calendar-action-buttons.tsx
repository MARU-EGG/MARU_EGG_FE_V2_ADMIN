import { useCalendarContext } from '@/components/calendar/context/calendar-context';
import chevronLeftIcon from '@public/svg/chevron-left.svg';
import chevronRightIcon from '@public/svg/chevron-right.svg';
import Image from 'next/image';

function CalendarActionButtons() {
  const { dispatch } = useCalendarContext();
  return (
    <div className="flex gap-5">
      <button className="rounded-md bg-primary-egg px-3 py-[6px] text-sm font-semibold text-primary-maru">
        이벤트 생성
      </button>
      <div className="flex gap-3">
        <button onClick={dispatch.handlePrevMonth}>
          <Image src={chevronLeftIcon} alt="이전 달" />
        </button>
        <button onClick={dispatch.handleNextMonth}>
          <Image src={chevronRightIcon} alt="다음 달" />
        </button>
      </div>
    </div>
  );
}

export default CalendarActionButtons;
