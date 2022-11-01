import React from 'react';
import { formatDate, long_date_format } from '@plone/volto/helpers/Utils/Date';
import { useSelector } from 'react-redux';

/**
 * Friendly formatting of dates
 */
const FormattedDate = ({
  date,
  format,
  long,
  includeTime,
  relative,
  className,
  locale,
  isHistory,
  children,
}) => {
  const language = useSelector((state) => locale || state.intl.locale);
  const toDate = (d) => (typeof d === 'string' ? new Date(d) : d);
  const args = { date, long, includeTime, format, locale: language };
  let options = isHistory
    ? {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
        timeZoneName: 'short',
      }
    : long_date_format;

  return (
    <time
      className={className}
      dateTime={date}
      title={new Intl.DateTimeFormat(language, options).format(
        new Date(toDate(date)),
      )}
    >
      {children
        ? children(
            formatDate({
              ...args,
              formatToParts: true,
            }),
          )
        : formatDate(args)}
    </time>
  );
};

export default FormattedDate;
