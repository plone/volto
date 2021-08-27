/**
 * Vocabularies reducer.
 * @module reducers/vocabularies/vocabularies
 */

import {
  GET_VOCABULARY,
  GET_VOCABULARY_TOKEN_TITLE,
} from '@plone/volto/constants/ActionTypes';

const initialState = { subrequests: {} };

/**
 * Vocabularies reducer.
 * @function vocabularies
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function vocabularies(state = initialState, action = {}) {
  const vocabState = state[action.vocabulary] || {};
  switch (action.type) {
    case `${GET_VOCABULARY}_PENDING`:
    case `${GET_VOCABULARY_TOKEN_TITLE}_PENDING`:
      const vocabStateP = {
        [action.vocabulary]: {
          // We preserve here the previous items array to prevent the component
          // to rerender due to prop changes while the PENDING state is active,
          // this little trick allow us to use how react-select do things
          // internally. This has a very low consequences since in the SUCCESS
          // state the items are overwritten anyways.
          ...vocabState,
          error: null,
          loaded: vocabState.loaded || false,
          loading: !!((vocabState.loading || 0) + 1),
        },
      };
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...vocabStateP,
              },
            },
          }
        : {
            ...state,
            ...vocabStateP,
          };
    case `${GET_VOCABULARY}_SUCCESS`:
      const vocabStateS = {
        [action.vocabulary]: {
          ...state[action.vocabulary],
          error: null,
          loaded: true,
          loading: !!(vocabState.loading - 1),
          items: [
            ...action.result.items.map((item) => ({
              label: item.title,
              value: item.token,
            })),
          ],
          batching: action.result.batching,
          itemsTotal: action.result.items_total,
        },
      };
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...vocabStateS,
              },
            },
          }
        : {
            ...state,
            ...vocabStateS,
          };
    case `${GET_VOCABULARY}_FAIL`:
    case `${GET_VOCABULARY_TOKEN_TITLE}_FAIL`:
      const vocabStateF = {
        [action.vocabulary]: {
          error: action.error,
          loaded: false,
          loading: !!(vocabState.loading - 1),
        },
      };

      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                vocabStateF,
              },
            },
          }
        : {
            ...state,
            ...vocabStateF,
          };
    case `${GET_VOCABULARY_TOKEN_TITLE}_SUCCESS`:
      return {
        ...state,
        [action.vocabulary]: {
          ...state[action.vocabulary],
          error: null,
          loaded: true,
          loading: !!(vocabState.loading - 1),
          [action.token]: action.result.items[0].title,
        },
      };
    default:
      return state;
  }
}
