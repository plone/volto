export default SidebarPortal;
/**
 * Portal that wraps Sidebar components
 * @param {React.ReactNode} children Sidebar content
 * @param {bool} selected Sidebar needs to know when the related block is selected
 * @param {string} tab Element id where to insert sidebar content, default: sidebar-properties
 * @returns {string} Rendered sidebar
 */
declare function SidebarPortal({ children, selected, tab }: React.ReactNode): string;
declare namespace SidebarPortal {
    namespace propTypes {
        let children: PropTypes.Requireable<any>;
        let selected: PropTypes.Validator<boolean>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
