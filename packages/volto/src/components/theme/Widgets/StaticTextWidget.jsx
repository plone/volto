import React from 'react';
import cx from 'classnames';

const StaticTextWidget = ({ value, className }) =>
  value ? (
    <p
      className={cx(className, 'statictext', 'widget')}
      dangerouslySetInnerHTML={{
        __html: value.data,
      }}
    />
  ) : (
    ''
  );

export default StaticTextWidget;
