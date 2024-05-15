import React, { forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Action.module.scss';

export const Action = forwardRef(
  ({ active, className, cursor, style, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={classNames(styles.Action, className)}
        tabIndex={0}
        style={{
          ...style,
          cursor,
          '--fill': active?.fill,
          '--background': active?.background,
        }}
      />
    );
  },
);
