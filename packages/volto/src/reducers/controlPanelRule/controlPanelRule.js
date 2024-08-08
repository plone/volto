import {
  GET_CONTROLPANEL_RULE,
  DELETE_CONTROLPANEL_RULE,
  EDIT_CONTROLPANEL_RULE,
  DELETECONDITION_CONTROLPANEL_RULE,
  ADDCONDITION_CONTROLPANEL_RULE,
  EDITCONDITION_CONTROLPANEL_RULE,
  UPCONDITION_CONTROLPANEL_RULE,
  DOWNCONDITION_CONTROLPANEL_RULE,
  DELETEACTION_CONTROLPANEL_RULE,
  EDITACTION_CONTROLPANEL_RULE,
  UPACTION_CONTROLPANEL_RULE,
  DOWNACTION_CONTROLPANEL_RULE,
  ADDACTION_CONTROLPANEL_RULE,
  GETACTION_CONTROLPANEL_RULE,
  MOVE_CONTENT_RULE,
  GETCONDITION_CONTROLPANEL_RULE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  delete: {
    loaded: false,
    loading: false,
    error: null,
  },
  edit: {
    loaded: false,
    loading: false,
    error: null,
  },
  deletecondition: {
    loaded: false,
    loading: false,
    error: null,
  },
  addcondition: {
    loaded: false,
    loading: false,
    error: null,
  },
  editcondition: {
    loaded: false,
    loading: false,
    error: null,
  },
  getcondition: {
    loaded: false,
    loading: false,
    error: null,
  },
  deleteaction: {
    loaded: false,
    loading: false,
    error: null,
  },
  addaction: {
    loaded: false,
    loading: false,
    error: null,
  },
  getaction: {
    loaded: false,
    loading: false,
    error: null,
  },
  editaction: {
    loaded: false,
    loading: false,
    error: null,
  },
  move: {
    loaded: false,
    loading: false,
    error: null,
  },
  item: {},
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  return actionType.split('_')[0].toLowerCase();
}

/**
 * Rules reducer.
 * @function rules
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */

//  ,
//   GETCONDITION_CONTROLPANEL_RULE,
export default function controlPanelRule(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTROLPANEL_RULE}_PENDING`:
    case `${DELETE_CONTROLPANEL_RULE}_PENDING`:
    case `${EDIT_CONTROLPANEL_RULE}_PENDING`:
    case `${DELETECONDITION_CONTROLPANEL_RULE}_PENDING`:
    case `${ADDCONDITION_CONTROLPANEL_RULE}_PENDING`:
    case `${EDITCONDITION_CONTROLPANEL_RULE}_PENDING`:
    case `${UPCONDITION_CONTROLPANEL_RULE}_PENDING`:
    case `${DOWNCONDITION_CONTROLPANEL_RULE}_PENDING`:
    case `${DELETEACTION_CONTROLPANEL_RULE}_PENDING`:
    case `${EDITACTION_CONTROLPANEL_RULE}_PENDING`:
    case `${UPACTION_CONTROLPANEL_RULE}_PENDING`:
    case `${DOWNACTION_CONTROLPANEL_RULE}_PENDING`:
    case `${ADDACTION_CONTROLPANEL_RULE}_PENDING`:
    case `${GETACTION_CONTROLPANEL_RULE}_PENDING`:
    case `${GETCONDITION_CONTROLPANEL_RULE}_PENDING`:
    case `${MOVE_CONTENT_RULE}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_CONTROLPANEL_RULE}_SUCCESS`:
      return {
        ...state,
        item: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GETCONDITION_CONTROLPANEL_RULE}_SUCCESS`:
      return {
        ...state,
        condition: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GETACTION_CONTROLPANEL_RULE}_SUCCESS`:
      return {
        ...state,
        action: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${DELETE_CONTROLPANEL_RULE}_SUCCESS`:
    case `${EDIT_CONTROLPANEL_RULE}_SUCCESS`:
    case `${DELETECONDITION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${ADDCONDITION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${EDITCONDITION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${UPCONDITION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${DOWNCONDITION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${DELETEACTION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${EDITACTION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${UPACTION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${DOWNACTION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${ADDACTION_CONTROLPANEL_RULE}_SUCCESS`:
    case `${MOVE_CONTENT_RULE}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.result?.failed,
        },
      };
    case `${GET_CONTROLPANEL_RULE}_FAIL`:
    case `${DELETE_CONTROLPANEL_RULE}_FAIL`:
    case `${EDIT_CONTROLPANEL_RULE}_FAIL`:
    case `${DELETECONDITION_CONTROLPANEL_RULE}_FAIL`:
    case `${ADDCONDITION_CONTROLPANEL_RULE}_FAIL`:
    case `${EDITCONDITION_CONTROLPANEL_RULE}_FAIL`:
    case `${UPCONDITION_CONTROLPANEL_RULE}_FAIL`:
    case `${DOWNCONDITION_CONTROLPANEL_RULE}_FAIL`:
    case `${DELETEACTION_CONTROLPANEL_RULE}_FAIL`:
    case `${EDITACTION_CONTROLPANEL_RULE}_FAIL`:
    case `${UPACTION_CONTROLPANEL_RULE}_FAIL`:
    case `${DOWNACTION_CONTROLPANEL_RULE}_FAIL`:
    case `${ADDACTION_CONTROLPANEL_RULE}_FAIL`:
    case `${MOVE_CONTENT_RULE}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
