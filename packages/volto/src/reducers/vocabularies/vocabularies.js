/**
 * Vocabularies reducer.
 * @module reducers/vocabularies/vocabularies
 */

import {
  GET_VOCABULARY,
  GET_VOCABULARY_TOKEN_TITLE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {};

/**
 * Vocabularies reducer.
 * @function vocabularies
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function vocabularies(state = initialState, action = {}) {
  const vocabState = state[action.vocabulary] || {};
  const subrequestState = action.subrequest
    ? vocabState.subrequests?.[action.subrequest] || {}
    : {};
  switch (action.type) {
    case `${GET_VOCABULARY}_PENDING`:
    case `${GET_VOCABULARY_TOKEN_TITLE}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            [action.vocabulary]: {
              ...vocabState,
              subrequests: {
                ...vocabState.subrequests,
                [action.subrequest]: {
                  // We preserve here the previous items array to prevent the component
                  // to rerender due to prop changes while the PENDING state is active,
                  // this little trick allow us to use how react-select do things
                  // internally. This has a very low consequences since in the SUCCESS
                  // state the items are overwritten anyways.
                  ...(subrequestState || {
                    data: null,
                  }),
                  loaded: vocabState?.[action.subrequest]?.loaded || false,
                  loading: !!(
                    (vocabState?.[action.subrequest]?.loading || 0) + 1
                  ),
                  error: null,
                },
              },
            },
          }
        : {
            ...state,
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
    case `${GET_VOCABULARY}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            [action.vocabulary]: {
              ...vocabState,
              subrequests: {
                ...vocabState.subrequests,
                [action.subrequest]: {
                  ...subrequestState,
                  error: null,
                  loaded: true,
                  loading: !!(subrequestState.loading - 1),
                  items: [
                    ...action.result.items.map((item) => ({
                      label: item.title,
                      value: item.token,
                    })),
                  ],
                  batching: action.result.batching,
                  itemsTotal: action.result.items_total,
                },
              },
            },
          }
        : {
            ...state,
            [action.vocabulary]: {
              ...vocabState,
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
    case `${GET_VOCABULARY}_FAIL`:
    case `${GET_VOCABULARY_TOKEN_TITLE}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            [action.vocabulary]: {
              subrequests: {
                ...vocabState.subrequests,
                [action.subrequest]: {
                  error: action.error,
                  loaded: false,
                  loading: !!(subrequestState.loading - 1),
                },
              },
            },
          }
        : {
            ...state,
            [action.vocabulary]: {
              error: action.error,
              loaded: false,
              loading: !!(vocabState.loading - 1),
            },
          };
    case `${GET_VOCABULARY_TOKEN_TITLE}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            [action.vocabulary]: {
              ...vocabState,
              subrequests: {
                ...vocabState.subrequests,
                [action.subrequest]: {
                  ...subrequestState,
                  error: null,
                  loaded: true,
                  loading: !!(subrequestState.loading - 1),
                  ...(action.token && {
                    [action.token]: action.result.items[0].title,
                  }),
                  ...(action.tokens && {
                    items: [
                      ...action.result.items.map((item) => ({
                        label: item.title,
                        value: item.token,
                      })),
                    ],
                  }),
                },
              },
            },
          }
        : {
            ...state,
            [action.vocabulary]: {
              ...vocabState,
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
