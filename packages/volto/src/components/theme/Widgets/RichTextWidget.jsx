import React from 'react';
import cx from 'classnames';

const RichTextWidget = ({ value, className }) =>
  value ? (
    <div
      className={cx(className, 'richtext', 'widget')}
      dangerouslySetInnerHTML={{
        __html: value.data,
      }}
    />
  ) : (
    ''
  );

export default RichTextWidget;
