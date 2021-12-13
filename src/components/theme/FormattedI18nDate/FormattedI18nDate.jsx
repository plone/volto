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

  const getFormattedDateString = () => {
    if (long && !includeTime) {
      return new Intl.DateTimeFormat(language, readable_date_format).format(
        new Date(date),
      );
    } else if (!long && !includeTime) {
      return new Intl.DateTimeFormat(language, short_date_format).format(
        new Date(date),
      );
    } else if (includeTime) {
      return new Intl.DateTimeFormat(
        language,
        short_date_and_time_format,
      ).format(new Date(date));
    }
  };
  return (
    <time
      datetime={date}
      title={new Intl.DateTimeFormat(language, readable_date_format).format(
        new Date(date),
      )}
    >
      {getFormattedDateString()}
    </time>
  );
};

export default FormattedI18nDate;
