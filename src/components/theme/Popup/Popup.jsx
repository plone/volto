import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Popup as SemanticPopup } from 'semantic-ui-react';

/**
 * Renders a preview image for a catalog brain result item.
 *
 */
function Popup(props) {
  const { menu, onOpen, onClose, ...rest } = props,
    [open, setOpen] = useState(false),
    handleOpen = useCallback(
      (e, props) => {
        setOpen(true);
        onOpen && onOpen(e, props);
      },
      [onOpen, setOpen],
    ),
    handleClick = useCallback(
      function (e) {
        if (menu) {
          setTimeout(() => {
            !e.nativeEvent?.defaultPrevented && setOpen(false);
          });
        }
      },
      [menu, setOpen],
    ),
    handleClose = useCallback(
      (e, props) => {
        setOpen(false);
        onClose && onClose(e, props);
      },
      [onClose, setOpen],
    ),
    handlePortalMount = useCallback(
      function(){
      },
      [],
    );;

  function PopupContainer(props) {
    console.log('render')
    return <div {...props} onClickCapture={handleClick}></div>;
  }

  return (
    <SemanticPopup
      as={PopupContainer}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onMount={handlePortalMount}
      {...rest}
    />
  );
}

Popup.propTypes = {
  menu: PropTypes.bool,
};

export default Popup;
