/**
 * Messages reducer.
 * @module reducers/messages/messages
 */
import { map, concat, filter } from 'lodash';

import {
  ADD_MESSAGE,
  REMOVE_MESSAGE,
  PURGE_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

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
              show: action.show,
            },
          ],
          state.messages,
        ),
      };
    case REMOVE_MESSAGE:
      return {
        messages: filter(state.messages, (message, index) =>
          action.index === -1
            ? index !== state.messages.length - 1
            : index !== action.index,
        ),
      };
    case PURGE_MESSAGES:
      return {
        messages: map(
          filter(state.messages, (message) => message.show),
          (message) => ({
            ...message,
            show: false,
          }),
        ),
      };
    default:
      return state;
  }
}
