import React from 'react';
import { Portal } from 'react-portal';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const DEFAULT_TIMEOUT = 500;

const SidebarPopup = (props, ref) => {
  const { children, open, overlay } = props;
  return (
    <CSSTransition
      in={open}
      timeout={DEFAULT_TIMEOUT}
      classNames={overlay ? 'overlay-container' : 'sidebar-container'}
      unmountOnExit
    >
      {overlay ? (
        <Portal node={document?.body}>
          <div className="overlay-container"></div>
        </Portal>
      ) : (
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
      )}
    </CSSTransition>
  );
};

SidebarPopup.propTypes = {
  open: PropTypes.bool,
};

SidebarPopup.defaultProps = {
  open: false,
};

export default React.forwardRef(SidebarPopup);
