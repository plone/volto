import React from 'react';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';

const UrlWidget = ({ value, children, className }) =>
  value ? (
    <UniversalLink href={value} className={cx(className, 'url', 'widget')}>
      {children ? children(value) : value}
    </UniversalLink>
  ) : (
    ''
  );

export default UrlWidget;
