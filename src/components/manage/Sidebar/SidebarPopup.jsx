import React from 'react';
import { Portal } from 'react-portal';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const DEFAULT_TIMEOUT = 500;

const SidebarPopup = React.forwardRef((props, ref) => {
  const { children, open, overlay } = props;
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
            ref={ref}
            key="sidebarpopup"
            className="sidebar-container"
            style={{ overflowY: 'auto' }}
          >
            {children}
          </aside>
        </Portal>
      </CSSTransition>
    </>
  );
});

SidebarPopup.propTypes = {
  open: PropTypes.bool,
  overlay: PropTypes.bool,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

SidebarPopup.defaultProps = {
  open: false,
  overlay: false,
  ref: null,
};

export default SidebarPopup;
