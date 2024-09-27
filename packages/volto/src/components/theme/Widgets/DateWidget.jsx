import React from 'react';
import cx from 'classnames';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { useSelector } from 'react-redux';
import { toBackendLang } from '@plone/volto/helpers';

const DateWidget = ({ value, children, className, format = 'll', moment }) => {
  const lang = useSelector((state) => state.intl.locale);
  const _moment = moment.default;
  _moment.locale(toBackendLang(lang));
  return value ? (
    <span className={cx(className, 'date', 'widget')}>
      {children
        ? children(_moment(value).format(format))
        : _moment(value).format(format)}
    </span>
  ) : (
    ''
  );
};

export default injectLazyLibs(['moment'])(DateWidget);
