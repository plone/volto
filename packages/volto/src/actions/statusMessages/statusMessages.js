/**
 * Status messages actions.
 * @module actions/statusMessages/statusMessages
 */

import {
  ADD_STATUS_MESSAGES,
  CLEAR_STATUS_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

/**
 * Add status messages of the backend.
 * @function addStatusMessages
 * @param {Array} messages The messages, as `{ message, type }`.
 * @returns {Object} Add status messages action.
 */
export function addStatusMessages(messages) {
  return {
    type: ADD_STATUS_MESSAGES,
    messages,
  };
}

/**
 * Clear the status messages, once they are shown.
 * @function clearStatusMessages
 * @returns {Object} Clear status messages action.
 */
export function clearStatusMessages() {
  return {
    type: CLEAR_STATUS_MESSAGES,
  };
}
