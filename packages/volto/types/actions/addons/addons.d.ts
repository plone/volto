/**
 * List addons function
 * @function listAddons
 * @returns {Object} List addons action
 */
export function listAddons(): any;
/**
 * Install addon function.
 * @function installAddon
 * @param {string} id Addon id
 * @returns {Object} install addon action.
 */
export function installAddon(id: string): any;
/**
 * Uninstall addon function.
 * @function uninstallAddon
 * @param {string} id Addon id
 * @returns {Object} uninstall addon action.
 */
export function uninstallAddon(id: string): any;
/**
 * Uninstall addon function.
 * @function upgradeAddon
 * @param {string} id Addon id
 * @returns {Object} id of addon to upgrade.
 */
export function upgradeAddon(id: string): any;
