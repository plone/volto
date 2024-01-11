import React from 'react';
import { Portal } from 'react-portal';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

const DEFAULT_TIMEOUT = 500;

const SidebarPopup = (props) => {
  const { children, open, onClose, overlay } = props;

  const asideElement = React.useRef();

  const handleClickOutside = (e) => {
    if (asideElement && doesNodeContainClick(asideElement.current, e)) return;
    onClose();
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
    };
  });

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
            ref={asideElement}
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
