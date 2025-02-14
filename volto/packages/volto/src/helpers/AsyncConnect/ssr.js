import { matchRoutes } from 'react-router-config';
import { mapSeries, isPromise } from './utils';
import { endGlobalLoad } from '@plone/volto/actions/asyncConnect/asyncConnect';

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
