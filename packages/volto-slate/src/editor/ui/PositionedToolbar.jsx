import React from 'react';
import { createPortal } from 'react-dom';

import BasicToolbar from './BasicToolbar';

const PositionedToolbar = ({ toggleButton, className, children, position }) => {
  // TODO: "position" is actually an object like `{ style: {} }`
  // To be renamed as "attributes" or "attrs"
  const ref = React.useRef();

  React.useEffect(() => {
    const el = ref.current;

    const { style } = position || {};
    const left = `${Math.max(style.left - el.offsetWidth / 2, 0)}px`;
    const top = `${style.top - el.offsetHeight}px`;

    el.style.opacity = style.opacity;
    el.style.top = top;
    el.style.left = left;
  });

  return createPortal(
    <BasicToolbar className={`slate-inline-toolbar ${className}`} ref={ref}>
      {children}
    </BasicToolbar>,
    document.body,
  );
};

export default PositionedToolbar;
