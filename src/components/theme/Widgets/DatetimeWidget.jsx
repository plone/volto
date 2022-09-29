import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';

const DatetimeWidget = ({ value, children, className, format = 'lll' }) => {
  const lang = useSelector((state) => state.intl.locale);
  moment.locale(lang);
  return value ? (
    <span className={cx(className, 'datetime', 'widget')}>
      {children
        ? children(moment(value).format(format))
        : moment(value).format(format)}
    </span>
  ) : (
    ''
  );
};

export default DatetimeWidget;
