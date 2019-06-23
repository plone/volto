/**
 * Add-ons actions.
 * @module actions/addons/addons
 */

import {
  INSTALL_ADDON,
  LIST_ADDONS,
  UNINSTALL_ADDON,
  UPGRADE_ADDON,
} from '../../constants/ActionTypes';

/**
 * List addons function
 * @function listAddons
 * @returns {Object} List addons action
 */
export function listAddons() {
  return {
    type: LIST_ADDONS,
    request: {
      op: 'get',
      path: `/@addons`,
    },
  };
}

/**
 * Install addon function.
 * @function installAddon
 * @param {string} id Addon id
 * @returns {Object} install addon action.
 */
export function installAddon(id) {
  return {
    type: INSTALL_ADDON,
    request: {
      op: 'post',
      path: `/@addons/${id}/install`,
    },
  };
}

/**
 * Uninstall addon function.
 * @function uninstallAddon
 * @param {string} id Addon id
 * @returns {Object} uninstall addon action.
 */
export function uninstallAddon(id) {
  return {
    type: UNINSTALL_ADDON,
    request: {
      op: 'post',
      path: `/@addons/${id}/uninstall`,
    },
  };
}

/**
 * Uninstall addon function.
 * @function upgradeAddon
 * @param {string} id Addon id
 * @returns {Object} id of addon to upgrade.
 */
export function upgradeAddon(id) {
  return {
    type: UPGRADE_ADDON,
    request: {
      op: 'post',
      path: `/@addons/${id}/upgrade`,
    },
  };
}
