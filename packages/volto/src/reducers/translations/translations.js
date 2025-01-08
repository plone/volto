/**
 * translations reducers
 */

import {
  GET_CONTENT_TRANSLATION,
  GET_CONTENT_TRANSLATION_SERVICES,
} from '../../constants/ActionTypes';

const getContentTranslationServices = (state = {}, action = {}) => {
  switch (action.type) {
    case `${GET_CONTENT_TRANSLATION_SERVICES}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: undefined,
        data: [],
      };
    case `${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        data: action.result,
      };
    case `${GET_CONTENT_TRANSLATION_SERVICES}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.result,
        data: [],
      };
    default:
      return state;
  }
};

const getContentTranslation = (state = {}, action = {}) => {
  switch (action.type) {
    case `${GET_CONTENT_TRANSLATION}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: true,
                loaded: false,
                error: undefined,
                data: [],
              },
            },
          }
        : {
            ...state,
            content_translation: {
              loading: true,
              loaded: false,
              error: undefined,
              data: [],
            },
          };
    case `${GET_CONTENT_TRANSLATION}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: undefined,
                data: action.result.data,
              },
            },
          }
        : {
            ...state,
            content_translation: {
              loading: false,
              loaded: true,
              error: undefined,
              data: action.result.data,
            },
          };
    case `${GET_CONTENT_TRANSLATION}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: action.result,
                data: {},
              },
            },
          }
        : {
            ...state,
            content_translation: {
              loading: false,
              loaded: true,
              error: action.result,
              data: {},
            },
          };
    default:
      return state;
  }
};

export { getContentTranslationServices, getContentTranslation };
