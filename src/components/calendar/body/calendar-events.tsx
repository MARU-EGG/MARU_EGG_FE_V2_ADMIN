import { cn } from '@/lib/utils';

type CalendarEvents = {
  eventsList: Record<string, string[]>;
  type: 'REST_DAY' | 'EVENT';
  date: string;
};

type CalendarEvent = Pick<CalendarEvents, 'type'> & { eventName: string };

function CalendarEvents({ eventsList, date, type }: CalendarEvents) {
  if (!eventsList[date]) return;
  return (
    <div className="flex w-full flex-col items-center">
      {eventsList[date].map((eventName) => (
        <CalendarEvent key={eventName} type={type} eventName={eventName} />
      ))}
    </div>
  );
}

function CalendarEvent({ type, eventName }: CalendarEvent) {
  const eventStyle = cn(
    'flex items-center h-[22px] mb-1 w-11/12 rounded-md text-left text-sm px-1 text-monotone-white whitespace-nowrap overflow-hidden',
    {
      'bg-calendar-sunday': type === 'REST_DAY',
      'bg-primary-maru': type === 'EVENT',
    },
  );
  return (
    <div className={eventStyle}>
      <span className="w-full truncate">{eventName}</span>
    </div>
  );
}

export default CalendarEvents;
