import React from 'react';
import { Portal } from 'react-portal';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const DEFAULT_TIMEOUT = 500;

const SidebarPopup = (props) => {
  const { children, open, onClose, overlay } = props;

  const handleClickOutside = (e) => {
    let sidebarContainer = e?.target?.closest('#sidebar-popup-container');
    if (open && !sidebarContainer) {
      onClose();
    }
  };

  const handleESCPress = (e) => {
    if (e.code === 'Escape') onClose();
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside, false);
    } else {
      document.removeEventListener('click', handleClickOutside, false);
    }
    return () =>
      document.removeEventListener('click', handleClickOutside, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  React.useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleESCPress, false);
    } else {
      document.removeEventListener('keydown', handleESCPress, false);
    }
    return () => document.removeEventListener('keydown', handleESCPress, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <>
      {overlay && (
        <CSSTransition
          in={open}
          timeout={DEFAULT_TIMEOUT}
          classNames="overlay-container"
          unmountOnExit
        >
          <Portal node={document?.body}>
            <div className="overlay-container"></div>
          </Portal>
        </CSSTransition>
      )}
      <CSSTransition
        in={open}
        timeout={DEFAULT_TIMEOUT}
        classNames="sidebar-container"
        unmountOnExit
      >
        <Portal>
          <aside
            role="presentation"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            key="sidebarpopup"
            className="sidebar-container"
            id="sidebar-popup-container"
            style={{ overflowY: 'auto' }}
          >
            {children}
          </aside>
        </Portal>
      </CSSTransition>
    </>
  );
};

SidebarPopup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  overlay: PropTypes.bool,
};

SidebarPopup.defaultProps = {
  open: false,
  onClose: () => {},
  overlay: false,
};

export default SidebarPopup;
