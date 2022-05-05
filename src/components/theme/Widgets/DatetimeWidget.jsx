import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import config from '@plone/volto/registry';

const DatetimeWidget = ({ value, children, className }) => {
  moment.locale(config.settings.dateLocale);
  return value ? (
    <span className={cx(className, 'datetime', 'widget')}>
      {children
        ? children(moment(value).format('lll'))
        : moment(value).format('lll')}
    </span>
  ) : (
    ''
  );
};

export default DatetimeWidget;
