import { SHOW_SIDEBAR, HIDE_SIDEBAR } from '../../constants/ActionTypes';

/**
 * Show sidebar.
 * @function showSidebar
 * @returns {Object} Update sharing action.
 */
export function showSidebar() {
  return {
    type: SHOW_SIDEBAR,
    isSidebarOpen: true,
  };
}

/**
 * Hide sidebar.
 * @function hideSidebar
 * @returns {Object} Update sharing action.
 */
export function hideSidebar() {
  return {
    type: HIDE_SIDEBAR,
    isSidebarOpen: false,
  };
}
