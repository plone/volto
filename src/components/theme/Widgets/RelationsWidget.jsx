import React from 'react';
import cx from 'classnames';
import RelationWidget from './RelationWidget';

const RelationsWidget = ({ value, children, className }) =>
  value ? (
    <span className={cx(className, 'relations', 'widget')}>
      {value.map((item) => (
        <RelationWidget
          value={item}
          className={className}
          key={item.token || item.title || item}
        >
          {children}
        </RelationWidget>
      ))}
    </span>
  ) : (
    ''
  );

export default RelationsWidget;
