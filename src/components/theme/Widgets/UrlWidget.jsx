import React from 'react';
import cx from 'classnames';

const UrlWidget = ({ value, children, className }) =>
  value ? (
    <a
      href={value}
      className={cx(className, 'url', 'widget')}
      rel="noreferrer"
      target="_blank"
    >
      {children ? children(value) : value}
    </a>
  ) : (
    ''
  );

export default UrlWidget;
