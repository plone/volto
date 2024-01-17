import React from 'react';
import cx from 'classnames';

const TitleWidget = ({ value, children, className }) =>
  value ? (
    <h1 className={cx(className, 'title', 'widget', 'documentFirstHeading')}>
      {children ? children(value) : value}
    </h1>
  ) : (
    ''
  );

export default TitleWidget;
