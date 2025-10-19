import type { EventCT } from '@plone/types';
import { getDate, isSameDay } from '../../helpers';

interface EventDateProps {
  content: EventCT;
  locale: string;
}

const getDateTime = (date: string, locale: string): string => {
  const dateObject = new Date(date);
  const dateTimeFormat = Intl.DateTimeFormat([locale], {
    timeStyle: 'short',
    hourCycle: 'h12',
  });
  return dateTimeFormat.format(dateObject);
};

export default function EventDate({ locale, content }: EventDateProps) {
  if (!locale || !content) return;

  const { start, end, whole_day, open_end } = content;

  const startDate = getDate(start, locale);
  const startTime = getDateTime(start, locale);
  const endDate = getDate(end, locale);
  const endTime = getDateTime(end, locale);

  return (
    <p>
      {isSameDay(start, end) ? (
        <>
          {startDate}{' '}
          {!whole_day && (
            <>
              from {startTime}
              {!open_end && ` to ${endTime}`}
            </>
          )}
        </>
      ) : whole_day ? (
        <>
          {startDate}
          {!open_end && ` to ${endDate}`}
        </>
      ) : (
        <>
          {startDate} {startTime}
          {!open_end && ` to ${endDate} ${endTime}`}
        </>
      )}
    </p>
  );
}
