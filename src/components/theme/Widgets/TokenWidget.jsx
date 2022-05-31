import React from 'react';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';

const TokenWidget = ({ value, children, className }) =>
  value ? (
    <span className={cx(className, 'token', 'widget')}>
      {value.map((tag, key) => (
        <UniversalLink
          className="ui label"
          href={`/search?Subject=${tag}`}
          key={key}
        >
          {children ? children(tag) : tag}
        </UniversalLink>
      ))}
    </span>
  ) : (
    ''
  );

export default TokenWidget;
