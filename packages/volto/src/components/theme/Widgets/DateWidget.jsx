import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { formatDate } from '@plone/volto/helpers/Utils/Date';

const DateWidget = ({ value, children, className, format = 'll' }) => {
  const lang = useSelector((state) => state.intl.locale);
  const locale = toBackendLang(lang);
  const formatted = formatDate({ date: value, format, locale });
  return value ? (
    <span className={cx(className, 'date', 'widget')}>
      {children ? children(formatted) : formatted}
    </span>
  ) : (
    ''
  );
};

export default DateWidget;
