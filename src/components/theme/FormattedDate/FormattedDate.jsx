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

  return (
    <time
      className={className}
      dateTime={date}
      title={new Intl.DateTimeFormat(language, long_date_format).format(
        new Date(toDate(date)),
      )}
    >
      {children
        ? children(
            formatDate({
              date,
              long,
              includeTime,
              format,
              locale: language,
              formatToParts: true,
            }),
          )
        : formatDate({ date, long, includeTime, format, locale: language })}
    </time>
  );
};

export default FormattedDate;
