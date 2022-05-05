import React from 'react';
import cx from 'classnames';

const EmailWidget = ({ value, children, className }) =>
  value ? (
    <a
      href={'mailto:' + value}
      className={cx(className, 'email', 'widget')}
      rel="noreferrer"
      target="_blank"
    >
      {children ? children(value) : value}
    </a>
  ) : (
    ''
  );

export default EmailWidget;
