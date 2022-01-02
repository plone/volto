import React from 'react';
import { useSelector } from 'react-redux';

const FormattedI18nDate = ({ date, format, long, includeTime }) => {
  const language = useSelector((state) => state.intl.locale);
  const readable_date_format = {
    // Thursday, December 9, 2021 at 10:39 AM
    dateStyle: 'full',
    timeStyle: 'short',
  };
  const short_date_format = {
    // 12/9/2021
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const short_date_and_time_format = {
    // 12/9/21, 10:39 AM
    dateStyle: 'short',
    timeStyle: 'short',
  };

  const getFormattedDateString = (format) => {
    format = format
      ? format
      : long && !includeTime
      ? readable_date_format
      : includeTime
      ? short_date_and_time_format
      : short_date_format;
    return new Intl.DateTimeFormat(language, format).format(new Date(date));
  };

  return (
    <time
      dateTime={date}
      title={new Intl.DateTimeFormat(language, readable_date_format).format(
        new Date(date),
      )}
    >
      {getFormattedDateString(format)}
    </time>
  );
};

export default FormattedI18nDate;
