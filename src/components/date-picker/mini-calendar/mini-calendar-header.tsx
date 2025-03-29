import { DateInfo } from '@/types/calendar';
import chevronLeftIcon from '@public/svg/chevron-left.svg';
import chevronRightIcon from '@public/svg/chevron-right.svg';
import Image from 'next/image';

type MiniCalendarHeaderProps = {
  dateInfo: DateInfo;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};

function MiniCalendarHeader({ dateInfo, handlePrevMonth, handleNextMonth }: MiniCalendarHeaderProps) {
  return (
    <div className="flex w-full justify-between py-2">
      <button onClick={handlePrevMonth}>
        <Image src={chevronLeftIcon} alt="이전 달" />
      </button>
      <span>
        {dateInfo.year}년{dateInfo.month}월
      </span>
      <button onClick={handleNextMonth}>
        <Image src={chevronRightIcon} alt="다음 달" />
      </button>
    </div>
  );
}

export default MiniCalendarHeader;
