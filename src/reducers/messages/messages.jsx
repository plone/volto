/**
 * Messages reducer.
 * @module reducers/messages
 */
import { concat, filter } from 'lodash';

import { ADD_MESSAGE, REMOVE_MESSAGE } from '../../constants/ActionTypes';

const initialState = {
  messages: [],
};

/**
 * Messages reducer.
 * @function messages
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function messages(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        messages: concat(
          [
            {
              id: action.id,
              title: action.title,
              body: action.body,
              level: action.level,
            },
          ],
          state.messages,
        ),
      };
    case REMOVE_MESSAGE:
      return {
        messages: filter(
          state.messages,
          (message, index) =>
            action.index === -1
              ? index !== state.messages.length - 1
              : index !== action.index,
        ),
      };
    default:
      return state;
  }
}
