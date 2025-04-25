import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/**
 * Portal that wraps Sidebar components
 * @param {React.ReactNode} children Sidebar content
 * @param {bool} selected Sidebar needs to know when the related block is selected
 * @param {string} tab Element id where to insert sidebar content, default: sidebar-properties
 * @returns {string} Rendered sidebar
 */
const SidebarPortal = ({ children, selected, tab = 'sidebar-properties' }) => {
  const [isClient, setIsClient] = React.useState(null);

  React.useEffect(() => setIsClient(true), []);

  return (
    <>
      {isClient &&
        selected &&
        createPortal(
          <div role="form" style={{ height: '100%' }}>
            <div
              style={{ height: '100%' }}
              role="presentation"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            >
              {children}
            </div>
          </div>,
          document.getElementById(tab),
        )}
    </>
  );
};

SidebarPortal.propTypes = {
  children: PropTypes.any,
  selected: PropTypes.bool.isRequired,
};

export default SidebarPortal;
