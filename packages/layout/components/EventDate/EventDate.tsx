import type { EventCT } from '@plone/types';
import { getDate, isSameDay } from '../../helpers';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  if (!locale || !content) return;

  const { start, end, whole_day, open_end } = content;

  const startDate = getDate(start, locale);
  const startTime = getDateTime(start, locale);
  const endDate = getDate(end, locale);
  const endTime = getDateTime(end, locale);

  return (
    <dd>
      {isSameDay(start, end) ? (
        <>
          {whole_day
            ? startDate
            : open_end
              ? t('layout.views.event.time.same_day_open_end', {
                  date: startDate,
                  fromTime: startTime,
                })
              : t('layout.views.event.time.same_day_range', {
                  date: startDate,
                  fromTime: startTime,
                  toTime: endTime,
                })}
        </>
      ) : whole_day ? (
        open_end ? (
          t('layout.views.event.time.multi_day_whole_day_open', {
            fromDate: startDate,
          })
        ) : (
          t('layout.views.event.time.multi_day_whole_day', {
            fromDate: startDate,
            toDate: endDate,
          })
        )
      ) : open_end ? (
        t('layout.views.event.time.multi_day_range_open', {
          fromDate: startDate,
          fromTime: startTime,
        })
      ) : (
        t('layout.views.event.time.multi_day_range', {
          fromDate: startDate,
          fromTime: startTime,
          toDate: endDate,
          toTime: endTime,
        })
      )}
    </dd>
  );
}
