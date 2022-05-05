import React from 'react';
import cx from 'classnames';

const TokenWidget = ({ value, children, className }) =>
  value ? (
    <span className={cx(className, 'token', 'widget')}>
      {value.map((tag) => (
        <a className="ui label" href={`/search?Subject=${tag}`} key={tag}>
          {children ? children(tag) : tag}
        </a>
      ))}
    </span>
  ) : (
    ''
  );

export default TokenWidget;
