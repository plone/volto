import React from 'react';

import BasicToolbar from './BasicToolbar';
import Expando from './Expando';

const ExpandedToolbar = React.forwardRef(
  ({ className, toggleButton, children, ...props }, ref) => {
    return (
      <BasicToolbar {...props} className={className} ref={ref}>
        {children}
        <Expando />
        {toggleButton}
      </BasicToolbar>
    );
  },
);

export default ExpandedToolbar;
