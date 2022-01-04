import React from 'react';
import {
  formatRelativeDate,
  long_date_format,
} from '@plone/volto/helpers/Utils/Date';
import { useSelector } from 'react-redux';

const FormattedRelativeDate = ({
  date,
  style,
  relativeTo,
  className,
  locale,
}) => {
  const language = useSelector((state) => locale || state.intl.locale);

  return (
    <time
      className={className}
      dateTime={date}
      title={new Intl.DateTimeFormat(language, long_date_format).format(
        new Date(date),
      )}
    >
      {formatRelativeDate({ locale: language, date, style, relativeTo })}
    </time>
  );
};

export default FormattedRelativeDate;
