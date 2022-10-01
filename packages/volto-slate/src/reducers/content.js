/**
 * Upload reducer.
 * @module reducers/content
 *
 * Customized copy of Volto's content reducer
 */

import config from '@plone/volto/registry';

import { UPLOAD_CONTENT } from '@plone/volto-slate/constants';

const initialState = {};

/**
 * Content reducer.
 * @function content
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function upload_content(state = initialState, action = {}) {
  let { result, origin } = action;
  switch (action.type) {
    case `${UPLOAD_CONTENT}_PENDING`:
      return {
        ...state,
        [origin]: {
          ...state[origin],
          upload: {
            loading: true,
            loaded: false,
            error: null,
          },
        },
      };
    case `${UPLOAD_CONTENT}_SUCCESS`:
      return {
        ...state,
        [origin]: {
          ...state[origin],
          data: {
            ...result,
            items:
              action.result &&
              action.result.items &&
              action.result.items.map((item) => ({
                ...item,
                url: item['@id'].replace(config.settings.apiPath, ''),
              })),
          },
          upload: {
            loading: false,
            loaded: true,
            error: null,
          },
        },
      };
    case `${UPLOAD_CONTENT}_FAIL`:
      return {
        ...state,
        [origin]: {
          ...state[origin],
          data: null,
          upload: {
            loading: false,
            loaded: false,
            error: action.error,
          },
        },
      };
    default:
      return state;
  }
}
