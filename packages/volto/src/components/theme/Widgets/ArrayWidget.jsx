import React from 'react';
import cx from 'classnames';

const ArrayWidget = ({ value, children, className }) =>
  value ? (
    <span className={cx(className, 'array', 'widget')}>
      {value.map((item, key) => (
        <>
          {key ? ', ' : ''}
          <span key={item.token || item.title || item}>
            {children
              ? children(item.title || item.token || item)
              : item.title || item.token || item}
          </span>
        </>
      ))}
    </span>
  ) : (
    ''
  );

export default ArrayWidget;
