import { isCmsUi } from '@plone/volto/helpers/Url/Url';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
const PROTECT_START = '@@loadProtector/START';
const PROTECT_END = '@@loadProtector/END';
const PROTECT_SKIPPED = '@@loadProtector/SKIPPED';
const GET_CONTENT_PENDING = 'GET_CONTENT_PENDING';
const GET_CONTENT_SUCCESS = 'GET_CONTENT_SUCCESS';
const GET_CONTENT_FAIL = 'GET_CONTENT_FAIL';
const RESET_CONTENT = 'RESET_CONTENT';

// ---
// The load protector middlewares have multiple purposes.
//
// 1. Maintained a delayed location that can be used to trigger an UI
// change (such as scroll to top) after all content for the page has been
// loaded.
//
// 2. When moving from a non content route to a content route, issue
// a data reset before the content load operation. - However do not do
// such a reset when navigating between two content routes.
// ---

export const protectLoadStart =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return next(action);
    }
    switch (action.type) {
      case LOCATION_CHANGE:
        const { location } = action.payload;
        const { pathname: path } = location;
        const currentPath = getState().router.location.pathname;
        const result = next(action);
        if (isCmsUi(path)) {
          // Next path: isCmsUI, Non Content. There is no
          // loading here, so skip counting altogether.
          // Will update the delayed location constantly.
          dispatch({
            type: PROTECT_SKIPPED,
            location,
          });
        } else {
          dispatch({
            type: PROTECT_START,
            location,
            // Only reset before the fetch, if we depart from
            // a not isCmsUi, Content pass. However, reset will
            // not occur if moving between two content paths,
            // only the postponed location will be booked.
            resetBeforeFetch: isCmsUi(currentPath),
          });
        }
        return result;
      default:
        return next(action);
    }
  };

// Note that there is a bit of heuristics here. We assume that every action
// like this is beginning/ending an action. If this logic fails then the counting
// will be off, resulting either a premature or an indefinitely missing state change.
const isRequestAction = (action) => action.type.endsWith('_PENDING');
const isResponseAction = (action) =>
  action.type.endsWith('_SUCCESS') || action.type.endsWith('_FAIL');

// Action map defines an action to be emitted before the key action
const mapActions = {
  [GET_CONTENT_PENDING]: RESET_CONTENT,
};

export const protectLoadEnd =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return next(action);
    }
    const { isCounting, resetBeforeFetch, requestCount } =
      getState().loadProtector;
    if (resetBeforeFetch) {
      const type = mapActions[action.type];
      if (type) {
        dispatch({ type });
      }
    }
    if (isCounting && requestCount === 1 && isResponseAction(action)) {
      setTimeout(
        () =>
          dispatch({
            type: PROTECT_END,
          }),
        0,
      );
    }
    return next(action);
  };

export function loadProtector(state = {}, action = {}) {
  switch (action.type) {
    case PROTECT_START:
      return {
        ...state,
        requestCount: 0,
        isCounting: true,
        resetBeforeFetch: action.resetBeforeFetch,
        postponedLocation: action.location,
      };
    case PROTECT_END:
      return {
        ...state,
        requestCount: 0,
        isCounting: false,
        resetBeforeFetch: false,
      };
    case PROTECT_SKIPPED:
      return {
        ...state,
        requestCount: 0,
        isCounting: false,
        resetBeforeFetch: false,
        postponedLocation: null,
        location: action.location,
      };
    case GET_CONTENT_SUCCESS:
    case GET_CONTENT_FAIL:
      if (state.isCounting) {
        return {
          ...state,
          requestCount: state.requestCount - 1,
          postponedLocation: null,
          location: state.postponedLocation,
        };
      } else {
        return state;
      }
    case RESET_CONTENT:
      if (state.resetBeforeFetch) {
        return {
          ...state,
          resetBeforeFetch: false,
        };
      } else {
        return state;
      }
    default:
      const { isCounting, requestCount } = state;
      if (isCounting && isRequestAction(action)) {
        return {
          ...state,
          requestCount: requestCount + 1,
        };
      } else if (isCounting && isResponseAction(action)) {
        return {
          ...state,
          requestCount: requestCount - 1,
        };
      } else {
        return state;
      }
  }
}
