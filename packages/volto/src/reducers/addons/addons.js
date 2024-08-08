/**
 * Addons reducer.
 * @module reducers/addons/addons
 */

import {
  INSTALL_ADDON,
  LIST_ADDONS,
  UNINSTALL_ADDON,
} from '../../constants/ActionTypes';

const initialState = {
  error: null,
  installedAddons: [],
  availableAddons: [],
  upgradableAddons: [],
  loaded: false,
  loading: false,
};

/**
 * Case-insensitive sorting method for Addons names.
 * @function addonsSorter
 * @param {String} a Add-on name.
 * @param {String} b Add-on name.
 * @returns {Number} Comparison result.
 */
function addonsSorter(a, b) {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) {
    return -1;
  } else if (titleA > titleB) {
    return 1;
  }
  return 0;
}

/**
 * Addons reducer.
 * @function addons
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function addons(state = initialState, action = {}) {
  switch (action.type) {
    case `${INSTALL_ADDON}_PENDING`:
    case `${LIST_ADDONS}_PENDING`:
    case `${UNINSTALL_ADDON}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${LIST_ADDONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        installedAddons: action.result.items
          .filter((elem) => elem.is_installed === true)
          .sort(addonsSorter),
        availableAddons: action.result.items
          .filter((elem) => elem.is_installed === false)
          .sort(addonsSorter),
        upgradableAddons: action.result.items
          .filter((elem) => elem.upgrade_info.available === true)
          .sort(addonsSorter),
        loaded: true,
        loading: false,
      };
    case `${INSTALL_ADDON}_SUCCESS`:
    case `${UNINSTALL_ADDON}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${INSTALL_ADDON}_FAIL`:
    case `${LIST_ADDONS}_FAIL`:
    case `${UNINSTALL_ADDON}_FAIL`:
      return {
        ...state,
        error: action.error,
        installedAddons: [],
        availableAddons: [],
        upgradableAddons: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
