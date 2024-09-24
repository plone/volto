/**
 * Get rules function.
 * @function getRules
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getRules(url: string): any;
/**
 * Get rules for control panel function.
 * @function getControlPanelRules
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getControlPanelRules(url: string): any;
/**
 * Get rules for control panel function.
 * @function getControlPanelRule
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getControlPanelRule(url: string, rule: any): any;
/**
 * Enable rules function.
 * @function enableRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Enable rules action.
 */
export function enableRules(url: string, rules: any[]): any;
/**
 * Disable rules function.
 * @function disableRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} Disable rules action.
 */
export function disableRules(url: string, rules: any[]): any;
/**
 * Apply rules to subfolders function.
 * @function applyRulesToSubfolders
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} apply rules to subfolders action.
 */
export function applyRulesToSubfolders(url: string, rules: any[]): any;
/**
 * Unnaply Rules to subfolders function.
 * @function unapplyRulesToSubfolders
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} unnaply rules to subfolders action.
 */
export function unapplyRulesToSubfolders(url: string, rules: any[]): any;
/**
 * Remove rules function.
 * @function removeRules
 * @param {string} url Content url.
 * @param {Array} rules Array containing rules id's.
 * @returns {Object} remove rules action.
 */
export function removeRules(url: string, rules: any[]): any;
/**
 * Add rules function.
 * @function addRule
 * @param {string} url Content url.
 * @param {string} rule String with rule id.
 * @returns {Object} add rule action.
 */
export function addRule(url: string, rule: string): any;
/**
 * Delete rule function.
 * @function deleteControlPanelRule
 * @param {string} url Content url.
 * @param {string} rule String with rule id.
 * @returns {Object} delete rule action.
 */
export function deleteControlPanelRule(url: string, rule: string): any;
/**
 * Get content rules events function.
 * @function getContentRulesEvents
 * @param {string} url Content url.
 * @returns {Object} Get content rules events action.
 */
export function getContentRulesEvents(url: string): any;
/**
 * Add new rule function.
 * @function addNewRule
 * @param {string} url Content url.
 * @returns {Object} Add new rule action.
 */
export function addNewRule(url: string, data: any): any;
/**
 * Move rule condition function.
 * @function moveRuleCondition
 * @param {string} url Content url.
 * @returns {Object} Move rule condition action.
 */
export function moveRuleCondition(url: string, data: any, ruleId: any, condId: any): any;
/**
 * Move rule action function.
 * @function moveRuleAction
 * @param {string} url Content url.
 * @returns {Object} Move rule action action.
 */
export function moveRuleAction(url: string, data: any, ruleId: any, actionId: any): any;
/**
 * Edit rule function.
 * @function editRule
 * @param {string} url Content url.
 * @returns {Object} Edit rule action.
 */
export function editRule(url: string, data: any, rule: any): any;
/**
 * Remove rule condition function.
 * @function removeCondition
 * @param {string} url Content url.
 * @returns {Object} Remove rule condition action.
 */
export function removeCondition(url: string, rule: any, condition: any): any;
/**
 * Add rule condition function.
 * @function addCondition
 * @param {string} url Content url.
 * @returns {Object} Add rule condition action.
 */
export function addCondition(url: string, rule: any, data: any): any;
/**
 * Edit rule condition function.
 * @function editCondition
 * @param {string} url Content url.
 * @returns {Object} Edit rule condition action.
 */
export function editCondition(url: string, rule: any, data: any, condition_index: any): any;
/**
 * Get rule condition function.
 * @function getCondition
 * @param {string} url Content url.
 * @returns {Object} Get rule condition action.
 */
export function getCondition(url: string, rule: any, condition_index: any): any;
/**
 * Remove rule action function.
 * @function removeAction
 * @param {string} url Content url.
 * @returns {Object} Remove rule ction action.
 */
export function removeAction(url: string, rule: any, action: any): any;
/**
 * Add rule action function.
 * @function addAction
 * @param {string} url Content url.
 * @returns {Object} Add rule ction action.
 */
export function addAction(url: string, rule: any, data: any): any;
/**
 * Edit rule action function.
 * @function editAction
 * @param {string} url Content url.
 * @returns {Object} Edit rule action action.
 */
export function editAction(url: string, rule: any, data: any, action_index: any): any;
/**
 * Get rule action function.
 * @function getAction
 * @param {string} url Content url.
 * @returns {Object} Get rule action action.
 */
export function getAction(url: string, rule: any, action_index: any): any;
