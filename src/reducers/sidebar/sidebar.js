import { SHOW_SIDEBAR, HIDE_SIDEBAR } from '../../constants/ActionTypes';

const initialState = {
  isSidebarOpen: false,
};

/**
 * Sidebar reducer.
 * @function sidebar
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function sidebar(state = initialState, action = {}) {
  switch (action.type) {
    case 'SHOW_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: true,
      };
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: false,
      };
    default:
      return state;
  }
}
