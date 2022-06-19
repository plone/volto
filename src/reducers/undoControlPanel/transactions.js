/**
 * Trancsaction reducer.
 * @module reducers/undoControlPanel/transactions
 */
import { GET_TRANSACTION } from '../../constants/ActionTypes';

const initialState = {
  transactions: [],
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
  // revert: {
  //     error: null,
  //     loaded: false,
  //     loading: false,
  // },
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
 * Transaction reducer.
 * @function transactions
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function transactions(state = initialState, action = {}) {
  switch (action.type) {
    // case `${REVERT_HISTORY}_PENDING`:
    case `${GET_TRANSACTION}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_TRANSACTION}_SUCCESS`:
      return {
        ...state,
        transactions_recieved: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };

    // case `${REVERT_HISTORY}_SUCCESS`:
    //     return {
    //         ...state,
    //         [getRequestKey(action.type)]: {
    //             loading: false,
    //             loaded: true,
    //             error: null,
    //         },
    //     };

    // case `${REVERT_HISTORY}_FAIL`:
    case `${GET_TRANSACTION}_FAIL`:
      return {
        ...state,
        transactions_recieved: [],
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
