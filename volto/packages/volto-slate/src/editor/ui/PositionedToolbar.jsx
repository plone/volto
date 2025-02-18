import React from 'react';
import { createPortal } from 'react-dom';

import BasicToolbar from './BasicToolbar';

const PositionedToolbar = ({ toggleButton, className, children, position }) => {
  // TODO: "position" is actually an object like `{ style: {} }`
  // To be renamed as "attributes" or "attrs"
  const ref = React.useRef();
  const portalTarget = toggleButton || document.body;

  React.useEffect(() => {
    const el = ref.current;

    const { style } = position || {};
    // allow negative left positioning when portal isn't document.body
    // we need to use Math.max to avoid Slate AddLink popup going off screen
    // and it adds the toolbar to the body
    const left =
      portalTarget === document.body
        ? `${Math.max(style.left - el.offsetWidth / 2, 0)}px`
        : `${style.left - el.offsetWidth / 2}px`;
    const top = `${style.top - el.offsetHeight}px`;

    el.style.opacity = style.opacity;
    el.style.top = top;
    el.style.left = left;
  });

  return createPortal(
    <BasicToolbar className={`slate-inline-toolbar ${className}`} ref={ref}>
      {children}
    </BasicToolbar>,
    portalTarget,
  );
};

export default PositionedToolbar;
