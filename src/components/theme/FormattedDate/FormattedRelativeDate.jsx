import React from 'react';
import {
  formatRelativeDate,
  long_date_format,
} from '@plone/volto/helpers/Utils/Date';
import { useSelector } from 'react-redux';

const FormattedRelativeDate = ({ date, style, relativeTo }) => {
  const language = useSelector((state) => state.intl.locale);

  return (
    <time
      dateTime={date}
      title={new Intl.DateTimeFormat(language, long_date_format).format(
        new Date(date),
      )}
    >
      {formatRelativeDate({ language, date, style, relativeTo })}
    </time>
  );
};

export default FormattedRelativeDate;
