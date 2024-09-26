import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { toBackendLang } from '@plone/volto/helpers';

const DatetimeWidget = ({
  moment,
  value,
  children,
  className,
  format = 'lll',
}) => {
  const _moment = moment.default;
  const lang = useSelector((state) => state.intl.locale);
  _moment.locale(toBackendLang(lang));
  return value ? (
    <span className={cx(className, 'datetime', 'widget')}>
      {children
        ? children(_moment(value).format(format))
        : _moment(value).format(format)}
    </span>
  ) : (
    ''
  );
};

export default injectLazyLibs(['moment'])(DatetimeWidget);
