/**
 * Status messages reducer.
 * @module reducers/statusMessages/statusMessages
 */

import {
  ADD_STATUS_MESSAGES,
  CLEAR_STATUS_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  items: [],
};

/**
 * The status messages of the backend, from its statusmessages cookie.
 * @function statusMessages
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function statusMessages(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_STATUS_MESSAGES:
      return { items: [...state.items, ...action.messages] };
    case CLEAR_STATUS_MESSAGES:
      return initialState;
    default:
      return state;
  }
}
