import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { toBackendLang } from '@plone/volto/helpers';

const DateWidget = ({ value, children, className, format = 'll' }) => {
  const lang = useSelector((state) => state.intl.locale);
  moment.locale(toBackendLang(lang));
  return value ? (
    <span className={cx(className, 'date', 'widget')}>
      {children
        ? children(moment(value).format(format))
        : moment(value).format(format)}
    </span>
  ) : (
    ''
  );
};

export default DateWidget;
