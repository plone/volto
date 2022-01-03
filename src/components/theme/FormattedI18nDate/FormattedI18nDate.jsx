import React from 'react';
import { useSelector } from 'react-redux';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const YEAR = DAY * 365; // ? is this safe or should it be more accurate

const FormattedI18nDate = ({ date, format, long, includeTime, relative }) => {
  const now = React.useState(new Date());
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

  const getFormattedDateString = (date, format) => {
    format = format
      ? format
      : long && !includeTime
      ? readable_date_format
      : includeTime
      ? short_date_and_time_format
      : short_date_format;
    return new Intl.DateTimeFormat(language, format).format(new Date(date));
  };

  function formatDaysAgo(value) {
    const date = new Date(value);
    const deltaMiliTime = date.getTime() - Date.now();
    const deltaSeconds = deltaMiliTime / SECOND;
    const deltaDays = deltaMiliTime / DAY;
    const formatter = new Intl.RelativeTimeFormat(language);
    const tag = deltaDays < 1 ? 1 : 1;
    return formatter.format(Math.round(deltaDays), 'days');
  }

  const getRelativeFormattedDateString = () => {
    //
  };

  React.useEffect(() => {}, []);

  return (
    <time
      dateTime={date}
      title={new Intl.DateTimeFormat(language, readable_date_format).format(
        new Date(date),
      )}
    >
      {relative
        ? getRelativeFormattedDateString()
        : getFormattedDateString(format)}
    </time>
  );
};

export default FormattedI18nDate;
