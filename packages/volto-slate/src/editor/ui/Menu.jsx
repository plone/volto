import cx from 'classnames';
import React from 'react';
import { Button } from 'semantic-ui-react';

const Menu = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className={cx(className, 'slate-menu')} ref={ref}>
      <Button.Group {...props} />
    </div>
  );
});

export default Menu;
