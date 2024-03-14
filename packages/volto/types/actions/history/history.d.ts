/**
 * Get history function.
 * @function getHistory
 * @param {string} url Content url.
 * @returns {Object} Get history action.
 */
export function getHistory(url: string): any;
/**
 * Revert history function.
 * @function revertHistory
 * @param {string} url Content url.
 * @param {number} version Revert version.
 * @returns {Object} Revet history action.
 */
export function revertHistory(url: string, version: number): any;
