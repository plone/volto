import React from 'react';
import cx from 'classnames';

const DescriptionWidget = ({ value, children, className }) =>
  value ? (
    <p
      className={cx(className, 'description', 'widget', 'documentDescription')}
    >
      {children ? children(value) : value}
    </p>
  ) : (
    ''
  );

export default DescriptionWidget;
