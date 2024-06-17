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
  children,
}) => {
  const language = useSelector((state) => locale || state.intl.locale);
  const toDate = (d) => (typeof d === 'string' ? new Date(d) : d);
  const args = { date, long, includeTime, format, locale: language };
  const new_date = new Date(toDate(date));
  // Dat check taken from https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#1353711
  if (Object.prototype.toString.call(new_date) === '[object Date]') {
    // it is a date
    if (isNaN(new_date)) {
      // date object is not valid
      return <span>bad date</span>;
    }
  } else {
    // not a date object
    return <span>not a date</span>;
  }

  return (
    <time
      className={className}
      dateTime={date}
      title={new Intl.DateTimeFormat(language, long_date_format)
        .format(new_date)
        .replace('\u202F', ' ')}
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
