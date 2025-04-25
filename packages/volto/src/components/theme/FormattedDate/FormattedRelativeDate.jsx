import React from 'react';
import {
  formatRelativeDate,
  long_date_format,
  toDate,
} from '@plone/volto/helpers/Utils/Date';
import { useSelector } from 'react-redux';

const FormattedRelativeDate = ({
  date,
  style,
  relativeTo,
  className,
  locale,
  children,
  live = false,
  refresh = 5000,
}) => {
  const language = useSelector((state) => locale || state.intl.locale);
  const [liveRelativeTo, setLiveRelativeTo] = React.useState(
    relativeTo ? toDate(relativeTo) : new Date(),
  );

  const interval = React.useRef();

  React.useEffect(() => {
    if (live) {
      interval.current = setInterval(() => {
        setLiveRelativeTo(new Date());
      }, refresh);
    }
    return () => interval.current && clearInterval(interval.current);
  }, [refresh, live]);

  const args = { locale: language, date, style, relativeTo: liveRelativeTo };

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
