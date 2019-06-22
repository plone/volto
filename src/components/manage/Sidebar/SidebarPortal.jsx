import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';

/**
 * Portal that wraps Sidebar components
 * @param {Array} children Sidebar content
 * @param {bool} selected Sidebar needs to know when the related tile is selected
 * @returns {string} Rendered sidebar
 */
const SidebarPortal = ({ children, selected }) => (
  <>
    {selected && (
      <Portal
        node={__CLIENT__ && document.getElementById('sidebar-properties')}
      >
        <aside
          onClick={e => {
            e.stopPropagation();
          }}
          onKeyDown={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </aside>
      </Portal>
    )}
  </>
);

SidebarPortal.propTypes = {
  children: PropTypes.any,
  selected: PropTypes.bool.isRequired,
};

export default SidebarPortal;
