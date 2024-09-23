import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Popup as SemanticPopup } from 'semantic-ui-react';

/**
 * Renders a preview image for a catalog brain result item.
 *
 */
function Popup(props) {
  const { menu, onOpen, onClose, ...rest } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(
    (e, props) => {
      setOpen(true);
      onOpen && onOpen(e, props);
    },
    [onOpen, setOpen],
  );
  const handleClick = useCallback(
    function (e) {
      if (menu) {
        setTimeout(() => {
          !e.nativeEvent?.defaultPrevented && setOpen(false);
        });
      }
    },
    [menu, setOpen],
  );
  const handleClose = useCallback(
    (e, props) => {
      setOpen(false);
      onClose && onClose(e, props);
    },
    [onClose, setOpen],
  );

  const PopupContainer = React.useCallback(
    (props) => {
      return <div {...props} onClickCapture={handleClick}></div>;
    },
    [handleClick],
  );

  return (
    <SemanticPopup
      as={PopupContainer}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      {...rest}
    />
  );
}

Popup.propTypes = {
  menu: PropTypes.bool,
};

export default Popup;
