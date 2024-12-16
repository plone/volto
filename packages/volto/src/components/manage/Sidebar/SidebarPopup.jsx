import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import doesNodeContainClick from '@plone/volto/helpers/Utils/doesNodeContainClick/doesNodeContainClick';

const DEFAULT_TIMEOUT = 500;

const SidebarPopup = (props) => {
  const { children, open, onClose, overlay } = props;

  const asideElement = React.useRef();

  const handleClickOutside = (e) => {
    if (asideElement && doesNodeContainClick(asideElement.current, e)) return;
    onClose();
  };

  const handleEscapeKey = (e) => {
    if (open && e.key === 'Escape') {
      onClose();
      e.stopPropagation();
    }
  };

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, false);
    document.addEventListener('keyup', handleEscapeKey, false);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.removeEventListener('keyup', handleEscapeKey, false);
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
          <>
            {document?.body &&
              createPortal(
                <div className="overlay-container"></div>,
                document?.body,
              )}
          </>
        </CSSTransition>
      )}
      <CSSTransition
        in={open}
        timeout={DEFAULT_TIMEOUT}
        classNames="sidebar-container"
        unmountOnExit
      >
        <>
          {isClient &&
            createPortal(
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
              </aside>,
              document.body,
            )}
        </>
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
