import React from 'react';
import cx from 'classnames';

export default ({ data, detached, children }) => {
  return (
    <div
      className={cx(
        `${data['@type'] ? `${data['@type']} block` : ''} align`,
        {
          center: !Boolean(data.align),
          detached,
        },
        data.align,
      )}
    >
      <div
        className={cx({
          'full-width': data.align === 'full',
          large: data.size === 'l',
          medium: data.size === 'm',
          small: data.size === 's',
        })}
      >
        {children}
      </div>
    </div>
  );
};
