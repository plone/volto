/**
 * Add message function
 * @function addMessage
 * @param {string} title Message header
 * @param {string} body Message body.
 * @param {string} level Message level.
 * @returns {Object} Add message action.
 */
export function addMessage(title: string, body: string, level: string): any;
/**
 * Remove message function
 * @function removeMessage
 * @param {number} index Message index
 * @returns {Object} Add message action.
 */
export function removeMessage(index: number): any;
/**
 * Purge all messages function
 * @function purgeMessages
 * @returns {Object} Add message action.
 */
export function purgeMessages(): any;
