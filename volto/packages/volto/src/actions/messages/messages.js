/**
 * Message actions.
 * @module actions/message/message
 */
import { v4 as uuid } from 'uuid';

import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  PURGE_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

/**
 * Add message function
 * @function addMessage
 * @param {string} title Message header
 * @param {string} body Message body.
 * @param {string} level Message level.
 * @returns {Object} Add message action.
 */
export function addMessage(title, body, level) {
  return {
    type: ADD_MESSAGE,
    id: uuid(),
    title,
    body,
    level,
    show: true,
  };
}

/**
 * Remove message function
 * @function removeMessage
 * @param {number} index Message index
 * @returns {Object} Add message action.
 */
export function removeMessage(index) {
  return {
    type: REMOVE_MESSAGE,
    index,
  };
}

/**
 * Purge all messages function
 * @function purgeMessages
 * @returns {Object} Add message action.
 */
export function purgeMessages() {
  return {
    type: PURGE_MESSAGES,
  };
}
