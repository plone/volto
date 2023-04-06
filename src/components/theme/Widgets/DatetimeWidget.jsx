import React, { useMemo } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';

const noTimezoneDateRe = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/g;

const DatetimeWidget = ({ value, children, className }) => {
  const lang = useSelector((state) => state.intl.locale);

  const date = useMemo(() => {
    if (!noTimezoneDateRe.test(value)) {
      return new Date(value);
    }
    return new Date(value + 'Z');
  }, [value]);

  return value ? (
    <span className={cx(className, 'datetime', 'widget')}>
      {children
        ? children(
            date.toLocaleString(lang, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            }),
          )
        : date.toLocaleString(lang, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
    </span>
  ) : (
    ''
  );
};

export default DatetimeWidget;
