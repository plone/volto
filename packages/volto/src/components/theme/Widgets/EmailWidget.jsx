import React from 'react';
import cx from 'classnames';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

const EmailWidget = ({ value, children, className }) =>
  value ? (
    <UniversalLink
      href={'mailto:' + value}
      className={cx(className, 'email', 'widget')}
    >
      {children ? children(value) : value}
    </UniversalLink>
  ) : (
    ''
  );

export default EmailWidget;
