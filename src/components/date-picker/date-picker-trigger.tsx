import { CalendarDay } from '@/types/calendar';
import chevronBottomIcon from '@public/svg/chevron-bottom.svg';
import Image from 'next/image';

type DatePickerTriggerProps = {
  label: string;
  handleCalendar: () => void;
  value: CalendarDay | null;
};

function DatePickerTrigger({ label, handleCalendar, value }: DatePickerTriggerProps) {
  return (
    <button
      type="button"
      className="group relative h-11 w-60 rounded-md border border-grayscale-gray-20 px-5 text-left transition-all duration-200 ease-in-out hover:bg-grayscale-gray-10 hover:shadow-sm"
      onClick={handleCalendar}
    >
      <span className="font-semibold text-grayscale-gray-70 transition-colors duration-200 ease-in-out group-hover:text-grayscale-gray-80">
        {!value ? label : `${value.year}년 ${value.month}월 ${value.day}일`}
      </span>
      <Image
        src={chevronBottomIcon}
        className="absolute right-3 top-3 transition-transform duration-200 ease-in-out group-hover:opacity-80"
        alt="달력 선택"
      />
    </button>
  );
}

export default DatePickerTrigger;
