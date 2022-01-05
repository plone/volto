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
  children,
}) => {
  const language = useSelector((state) => locale || state.intl.locale);
  const args = { locale: language, date, style, relativeTo };

  return (
    <time
      className={className}
      dateTime={date}
      title={new Intl.DateTimeFormat(language, long_date_format).format(
        new Date(date),
      )}
    >
      {children
        ? children(
            formatRelativeDate({
              ...args,
              formatToParts: true,
            }),
          )
        : formatRelativeDate(args)}
    </time>
  );
};

export default FormattedRelativeDate;
