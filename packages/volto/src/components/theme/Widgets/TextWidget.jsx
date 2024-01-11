import React from 'react';
import cx from 'classnames';

const TextWidget = ({ value, children, className }) =>
  value ? (
    <span
      className={cx(className, 'text', 'widget')}
      style={{ whiteSpace: 'pre-wrap' }}
    >
      {children ? children(value) : value}
    </span>
  ) : (
    ''
  );
export default TextWidget;
