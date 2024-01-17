/**
 * Trancsaction reducer.
 * @module reducers/transactions/transactions
 */
import {
  GET_TRANSACTIONS,
  REVERT_TRANSACTIONS,
} from '../../constants/ActionTypes';

const initialState = {
  transactions_recieved: [],
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
  revert: {
    error: undefined,
    loaded: false,
    loading: false,
  },
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
    case `${REVERT_TRANSACTIONS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: undefined,
        },
      };

    case `${GET_TRANSACTIONS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };

    case `${GET_TRANSACTIONS}_SUCCESS`:
      return {
        ...state,
        transactions_recieved: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };

    case `${REVERT_TRANSACTIONS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };

    case `${GET_TRANSACTIONS}_FAIL`:
      return {
        ...state,
        transactions_recieved: [],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };

    case `${REVERT_TRANSACTIONS}_FAIL`:
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
