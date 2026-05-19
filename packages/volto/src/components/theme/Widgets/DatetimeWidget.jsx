import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { formatDate } from '@plone/volto/helpers/Utils/Date';

const DatetimeWidget = ({ value, children, className, format = 'lll' }) => {
  const lang = useSelector((state) => state.intl.locale);
  const locale = toBackendLang(lang);
  const formatted = formatDate({ date: value, format, locale });
  return value ? (
    <span className={cx(className, 'datetime', 'widget')}>
      {children ? children(formatted) : formatted}
    </span>
  ) : (
    ''
  );
};

export default DatetimeWidget;
