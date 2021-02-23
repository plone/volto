import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';
import { matchRoutes } from 'react-router-config';
import { isPromise } from './utils';
import { AsyncConnectWithContext } from './AsyncConnect';

import {
  load,
  loadSuccess,
  loadFail,
  beginGlobalLoad,
  endGlobalLoad,
} from '@plone/volto/actions';
export { loadOnServer, loadAsyncConnect } from './ssr';

const identity = (arg) => arg;
let immutableStateFunc = identity;
let mutableStateFunc = identity;
export const getImmutableState = (state) => immutableStateFunc(state);
export const getMutableState = (state) => mutableStateFunc(state);

// options is: { location, store: { dispatch }, route, match, routes }
const wrapWithDispatch = (Component, asyncItems = []) => {
  return [
    {
      key: 'voltoLoadAsyncProps',
      promise: (options) => {
        const {
          store: { dispatch },
          location: { pathname },
        } = options;

        const foundAsyncItems = applyExtenders(asyncItems, pathname);

        const connects = foundAsyncItems.map((item) => {
          const { key } = item;
          if (!key) return item;
          const next = item.promise(options);

          if (isPromise(next)) {
            dispatch(load(key));
            // add action dispatchers
            next
              .then((data) => dispatch(loadSuccess(key, data)))
              .catch((err) => dispatch(loadFail(key, err)));
          } else if (next) {
            dispatch(loadSuccess(key, next));
          }
          return {
            ...item,
            promise: next,
          };
        });

        Component.reduxAsyncConnect = connects;
        return connects;
      },
    },
  ];
};

const applyExtenders = (asyncItems, pathname) => {
  const { asyncPropsExtenders = [] } = config.settings;
  const extenders = matchRoutes(asyncPropsExtenders, pathname);

  const foundAsyncItems = extenders.reduce(
    (acc, extender) => extender.route.extend(acc),
    asyncItems,
  );

  return foundAsyncItems;
};

/**
 * A replacement for redux-connect's asyncConnect.
 *
 * It was needed because asyncConnect works as a direct wrapper on top of
 * a Component, so the config registry is not yet initialized. To solve this
 * problem we replace the original reduxAsyncConnect implementation (which was
 * a list of asyncConnected "object promises") with as single promise exposed
 * as { key: 'voltoLoadAsyncProps', promise: ... }.
 *
 * In more details, the original asyncConnect worked by replacing all our
 * "object promises" with a special version that's integrated with its own
 * Redux actions. We do another wrap, which takes the initial passed "object
 * promises", finds registered, per route, "extenders", calls these extenders
 * with the "object promises" and that's our "object promises" (which it calls
 * internally "asyncItems").
 */
export function asyncConnect(
  asyncItems,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options,
) {
  return (Component) => {
    Component.reduxAsyncConnect = wrapWithDispatch(Component, asyncItems);

    const finalMapStateToProps = (state, ownProps) => {
      const { pathname } = state.router.location;
      const foundAsyncItems = applyExtenders(asyncItems, pathname);
      const mutableState = getMutableState(state);
      const asyncStateToProps = foundAsyncItems.reduce((result, { key }) => {
        if (!key) {
          return result;
        }

        return {
          ...result,
          [key]: mutableState.reduxAsyncConnect[key],
        };
      }, {});

      if (typeof mapStateToProps !== 'function') {
        return asyncStateToProps;
      }

      return {
        ...mapStateToProps(getImmutableState(mutableState), ownProps),
        ...asyncStateToProps,
      };
    };

    return connect(
      finalMapStateToProps,
      mapDispatchToProps,
      mergeProps,
      options,
    )(Component);
  };
}

export const ReduxAsyncConnect = connect(null, {
  beginGlobalLoad,
  endGlobalLoad,
})(withRouter(AsyncConnectWithContext));
