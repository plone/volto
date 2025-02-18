/**
 * Get workflow function.
 * @function getWorkflow
 * @param {string|Array} urls Workflow url(s).
 * @returns {Object} Get workflow action.
 */
export function getWorkflow(urls: string | any[]): any;
/**
 * Transition workflow.
 * @function transitionWorkflow
 * @param {string} urls Content url(s).
 * @param {bool} include_children Include children.
 * @returns {Object} Transition workflow action.
 */
export function transitionWorkflow(urls: string, include_children?: bool): any;
