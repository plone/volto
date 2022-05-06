import React from 'react';
import cx from 'classnames';
import RelationWidget from './RelationWidget';

const RelationsWidget = ({ value, children, className }) =>
  value ? (
    <ul className={cx(className, 'relations', 'widget')}>
      {value.map((item, key) => (
        <li>
          <RelationWidget
            value={item}
            className={className}
            key={item.token || item.title || item}
          >
            {children}
          </RelationWidget>
        </li>
      ))}
    </ul>
  ) : (
    ''
  );

export default RelationsWidget;
