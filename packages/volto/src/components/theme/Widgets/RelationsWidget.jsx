import React from 'react';
import cx from 'classnames';
import RelationWidget from './RelationWidget';

const RelationsWidget = ({ value, children, className }) =>
  value ? (
    <ul className={cx(className, 'relations', 'widget')}>
      {value.map((item, key) => {
        return item ? (
          <li key={key}>
            <RelationWidget
              value={item || `relation target not found '${key}'`}
              className={className}
              key={item.token || item.title || item}
            >
              {children}
            </RelationWidget>
          </li>
        ) : null;
      })}
    </ul>
  ) : (
    ''
  );

export default RelationsWidget;
