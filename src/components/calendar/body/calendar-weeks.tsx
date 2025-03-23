import { cn } from '@/utils/style';

function CalendarWeeks() {
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토'] as const;
  return (
    <thead className="border-b">
      <tr>
        {WEEKS.map((day) => (
          <th
            className={cn('font-semibold', {
              'text-calendar-saturday': day === '토',
              'text-calendar-sunday': day === '일',
              'text-monotone-black': day !== '토' && day !== '일',
            })}
            key={day}
          >
            {day}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default CalendarWeeks;
