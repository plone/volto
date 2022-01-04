import React from 'react';
import {
  formatDate,
  readable_date_format,
} from '@plone/volto/helpers/Utils/Date';
import { useSelector } from 'react-redux';

const FormattedDate = ({ date, format, long, includeTime, relative }) => {
  const language = useSelector((state) => state.intl.locale);

  return (
    <time
      dateTime={date}
      title={new Intl.DateTimeFormat(language, readable_date_format).format(
        new Date(date),
      )}
    >
      {formatDate({ date, long, includeTime, format })}
    </time>
  );
};

export default FormattedDate;
