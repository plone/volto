import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';
import { matchAllRoutes } from './utils';

import {
  load,
  loadSuccess,
  loadFail,
  beginGlobalLoad,
  endGlobalLoad,
} from '@plone/volto/actions/asyncConnect/asyncConnect';

import { isPromise, getMutableState, getImmutableState } from './utils';
import { AsyncConnectWithContext } from './AsyncConnect';
export { loadOnServer, loadAsyncConnect } from './ssr';

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
  const extenders = matchAllRoutes(asyncPropsExtenders, pathname);

  const foundAsyncItems = extenders.reduce(
    (acc, extender) => extender.route.extend(acc),
    asyncItems,
  );

  let uniqueAsyncItems = foundAsyncItems.reduce((a, d) => {
    if (!a.some((el) => el.key === d.key)) {
      a.push(d);
    }
    return a;
  }, []);

  return uniqueAsyncItems;
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
