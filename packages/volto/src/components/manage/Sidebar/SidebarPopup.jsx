import React from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import doesNodeContainClick from 'semantic-ui-react/dist/commonjs/lib/doesNodeContainClick';

const DEFAULT_TIMEOUT = 500;

const SidebarPopup = (props) => {
  const { children, open, onClose, overlay, selectedBlock } = props;

  const asideElement = React.useRef();
  const [copied, setCopied] = React.useState(false);

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

  const handleCopyContent = async () => {
    if (asideElement.current) {
      const text = asideElement.current.innerText;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch {
        setCopied(false);
      }
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
                ref={asideElement}
                key="sidebarpopup"
                className="sidebar-container"
                style={{ overflowY: 'auto' }}
              >
                {selectedBlock && (
                  <button
                    type="button"
                    className="sidebar-copy-button"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      zIndex: 1000,
                      padding: '5px 10px',
                      backgroundColor: copied ? 'green' : '#f0f0f0',
                      color: copied ? 'white' : 'black',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={handleCopyContent}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
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
  selectedBlock: PropTypes.object,
};

SidebarPopup.defaultProps = {
  open: false,
  onClose: () => {},
  overlay: false,
  selectedBlock: null,
};

export default SidebarPopup;
