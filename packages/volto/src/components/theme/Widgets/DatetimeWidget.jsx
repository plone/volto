import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { toBackendLang } from '@plone/volto/helpers';

const DatetimeWidget = ({ value, children, className, format = 'lll' }) => {
  const lang = useSelector((state) => state.intl.locale);
  moment.locale(toBackendLang(lang));
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

export default injectLazyLibs(['moment'])(DatetimeWidget);
