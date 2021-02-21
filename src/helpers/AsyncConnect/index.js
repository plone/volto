import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';
import { matchRoutes } from 'react-router-config';
import { mapSeries } from './utils';

export const clearKey = createAction('@redux-conn/CLEAR');
export const beginGlobalLoad = createAction('@redux-conn/BEGIN_GLOBAL_LOAD');
export const endGlobalLoad = createAction('@redux-conn/END_GLOBAL_LOAD');
export const load = createAction('@redux-conn/LOAD', (key) => ({ key }));
export const loadSuccess = createAction(
  '@redux-conn/LOAD_SUCCESS',
  (key, data) => {
    return { key, data };
  },
);
export const loadFail = createAction('@redux-conn/LOAD_FAIL', (key, error) => ({
  key,
  error,
}));

const identity = (arg) => arg;
let immutableStateFunc = identity;
let mutableStateFunc = identity;
export const getImmutableState = (state) => immutableStateFunc(state);
export const getMutableState = (state) => mutableStateFunc(state);

export function isPromise(obj) {
  return typeof obj === 'object' && obj && obj.then instanceof Function;
}

const getAsyncItems = (state) => {
  return [];
};

// options is: { location, store: { dispatch }, route, match, routes }
const addLoader = (Component, asyncItems = []) => {
  return [
    {
      key: 'voltoLoadAsyncProps',
      promise: (options) => {
        const {
          store: { dispatch },
          location: { pathname },
        } = options;

        const extenders = matchRoutes(
          config.settings.asyncPropExtenders || [],
          pathname,
        );
        const nexts = extenders.reduce(
          (acc, extender) => extender.extend(acc),
          asyncItems,
        );

        const connects = nexts.map((item) => {
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

export function asyncConnect(
  asyncItems,
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options,
) {
  return (Component) => {
    Component.reduxAsyncConnect = addLoader(Component, asyncItems);

    const finalMapStateToProps = (state, ownProps) => {
      const asyncItems = getAsyncItems(state); // TODO: implement this?
      const mutableState = getMutableState(state);
      const asyncStateToProps = asyncItems.reduce((result, { key }) => {
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

export function filterComponents(branch) {
  return branch.reduce((result, { route, match }) => {
    if (route.component && route.component.reduxAsyncConnect) {
      result.push([route.component, { route, match }]);
    }

    return result;
  }, []);
}

export function loadAsyncConnect({
  location,
  routes = [],
  filter = () => true,
  ...rest
}) {
  const layered = filterComponents(matchRoutes(routes, location.pathname));

  if (layered.length === 0) {
    return Promise.resolve();
  }

  // this allows us to have nested promises, that rely on each other's completion
  // cycle
  return mapSeries(layered, ([component, routeParams]) => {
    if (component == null) {
      return Promise.resolve();
    }

    // Collect the results of each component
    const results = [];
    const asyncItems = component.reduxAsyncConnect;
    const asyncItemsArr = [...component.reduxAsyncConnect];

    // get array of results
    asyncItems.forEach((item) => {
      if (filter(item, component)) {
        // handle Volto's voltoLoadAsyncProps
        if (item.key === 'voltoLoadAsyncProps') {
          results.push(item);
          const asyncPropsItems = item.promise({
            ...rest,
            ...routeParams,
            location,
            routes,
          });
          asyncItemsArr.push(...asyncPropsItems);

          asyncPropsItems.forEach((asyncPropItem) => {
            let innerPromiseOrResult =
              (asyncPropItem && asyncPropItem.promise) || asyncPropItem;

            if (isPromise(innerPromiseOrResult)) {
              innerPromiseOrResult = innerPromiseOrResult.catch((error) => ({
                error,
              }));
            }
            results.push(innerPromiseOrResult);
          });
          return;
        }

        // handles default case of classic asyncConnect
        let promiseOrResult = item.promise({
          ...rest,
          ...routeParams,
          location,
          routes,
        });

        if (isPromise(promiseOrResult)) {
          promiseOrResult = promiseOrResult.catch((error) => ({ error }));
        }

        results.push(promiseOrResult);
      }
    });

    // map results to keys for prop injection
    const resolver = (finalResults) => {
      return Object.assign(
        {},
        finalResults.map((result, idx) => {
          const { key } = asyncItemsArr[idx];
          return key ? { [key]: result } : null;
        }),
      );
    };

    return Promise.all(results).then(resolver);
  });
}

export function loadOnServer(args) {
  return loadAsyncConnect(args).then(() => {
    args.store.dispatch(endGlobalLoad());
  });
}
