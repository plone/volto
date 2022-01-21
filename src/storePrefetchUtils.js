import { matchPath } from 'react-router';

import config from '@plone/volto/registry';

const PREFETCH_ROUTER_LOCATION_CHANGE = 'PREFETCH_ROUTER_LOCATION_CHANGE';

const matchCurrentPath = (path) => {
  // Delayed import is necessary to allow accessing the config from routes.
  // If this is done in import time it would happen before the config is customized.
  const routes = require('~/routes').default;
  const defaultRoutes = routes[0].routes;

  // const pathsList = ['/', '/**'];
  let alreadyMatched;

  for (let pathOption of defaultRoutes) {
    const match = matchPath(path, pathOption);
    // console.debug('pathOption', alreadyMatched, path, pathOption, match);
    if (
      match &&
      !alreadyMatched &&
      (match.path === '/**' || match.path === '/')
    ) {
      return true;
    }
    if (match) {
      alreadyMatched = true;
    }
  }
};

export const precacheContentStart = ({ dispatch, getState }) => (next) => (
  action,
) => {
  if (typeof action === 'function') {
    return next(action);
  }

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (action.payload?.location?.state?.isFromLogin) return next(action);

      console.log('action', action.type);
      if (!action.payload?.prefetched) {
        const path = action.payload.location.pathname;
        // TODO: use getBaseUrl based matching
        const isGetContent = matchCurrentPath(path);
        const expand =
          isGetContent && config.settings.contentExpand?.length
            ? `&expand=${config.settings.contentExpand.join(',')}`
            : '';
        const fullObjects = `${isGetContent ? '?fullobjects' : ''}${expand}`;
        const url = `${path}${fullObjects}`;
        if (!isGetContent) return next(action);
        const prefetchAction = {
          type: PREFETCH_ROUTER_LOCATION_CHANGE,
          path,
          originalAction: action,
          request: {
            op: 'get',
            path: url,
          },
        };
        console.debug('Start prefetch', url);
        return next(prefetchAction);
      }
      return next(action);
    default:
      return next(action);
  }
};

export const precacheContentEnd = ({ dispatch, getState }) => (next) => (
  action,
) => {
  if (typeof action === 'function') {
    return next(action);
  }

  const type = `${PREFETCH_ROUTER_LOCATION_CHANGE}_SUCCESS`;

  if (action.type === type) {
    console.log('prefetch action end', action);
    return dispatch({
      ...action.originalAction,
      payload: {
        ...action.originalAction.payload,
        prefetched: action.result,
      },
    });
  }

  console.log('precacheContentEnd', action.type);
  return next(action);
};

export const optimizeProvidersFetch = ({ getState, dispatch }) => (next) => (
  action,
) => {
  if (typeof action === 'function') {
    return next(action);
  }
  if (action.type === 'GET_DATA_FROM_PROVIDER') {
    const { data_providers } = getState();
    const { path } = action.request;
    if (
      data_providers.requested.includes(path) ||
      Object.keys(data_providers.data).includes(path)
    ) {
      console.debug(`provider already fetched: ${path}`);
      return;
    }

    return next(action);
  }
  return next(action);
};

export function prefetch(state = {}, action = {}) {
  switch (action.type) {
    case `@@router/LOCATION_CHANGE`:
      console.debug('action location change', action);
      return action.payload?.prefetched
        ? {
            ...state,
            [action.payload.location.pathname]: action.payload.prefetched,
          }
        : state;
    default:
      return state;
  }
}
