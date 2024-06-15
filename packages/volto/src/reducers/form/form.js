/**
 * Form reducer.
 * This reducer is prepopulated on the server based on post data.
 * @module reducers/form/form
 */

import {
  SET_FORM_DATA,
  SET_UI_STATE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  global: {},
  ui: {
    selected: null,
    multiSelected: [],
    gridSelected: null,
    hovered: null,
  },
};

/**
 * Form reducer.
 * @function form
 * @param {Object} state Current state.
 * @returns {Object} New state.
 */
export default function form(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FORM_DATA:
      return {
        ...state,
        global: action.data,
      };
    case SET_UI_STATE:
      return {
        ...state,
        ui: {
          ...state.ui,
          ...action.ui,
        },
      };
    default:
      return state;
  }
}
