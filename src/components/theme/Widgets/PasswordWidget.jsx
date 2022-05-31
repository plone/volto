import React from 'react';
import cx from 'classnames';

const PasswordWidget = ({ value, children, className }) =>
  value ? (
    <span className={cx(className, 'password', 'widget')}>
      {children ? children('********') : '********'}
    </span>
  ) : (
    ''
  );

export default PasswordWidget;
