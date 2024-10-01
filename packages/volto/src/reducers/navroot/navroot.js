import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';

import { GET_NAVROOT, GET_CONTENT } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  data: {},
};

/**
 * navroot reducer.
 * @function navroot
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function navroot(state = initialState, action = {}) {
  let hasExpander;
  switch (action.type) {
    case `${GET_NAVROOT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        data: {},
      };
    case `${GET_CONTENT}_SUCCESS`:
      hasExpander = hasApiExpander(
        'navroot',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (hasExpander && !action.subrequest) {
        return {
          ...state,
          error: null,
          data: action.result['@components'].navroot,
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${GET_NAVROOT}_SUCCESS`:
      hasExpander = hasApiExpander(
        'navroot',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (!hasExpander) {
        return {
          ...state,
          error: null,
          loaded: true,
          loading: false,
          data: action.result,
        };
      }
      return state;
    case `${GET_NAVROOT}_FAIL`:
      return {
        ...state,
        error: action.result,
        loaded: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}
