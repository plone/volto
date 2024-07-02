import { matchRoutes } from 'react-router-config';
export function isPromise(obj) {
  return typeof obj === 'object' && obj && obj.then instanceof Function;
}

export const mapSeries =
  Promise.mapSeries ||
  function promiseMapSeries(iterable, iterator) {
    const { length } = iterable;
    const results = new Array(length);
    let i = 0;

    function iterateOverResults() {
      return iterator(iterable[i], i, iterable).then((result) => {
        results[i] = result;
        i += 1;
        if (i < length) {
          return iterateOverResults();
        }

        return results;
      });
    }

    return iterateOverResults();
  };

const identity = (arg) => arg;
let immutableStateFunc = identity;
let mutableStateFunc = identity;
export const getImmutableState = (state) => immutableStateFunc(state);
export const getMutableState = (state) => mutableStateFunc(state);

export const matchAllRoutes = (routes, pathname) => {
  const matching = routes.reduce(
    (acc, route) => [...acc, ...matchRoutes([route], pathname)],
    [],
  );
  return matching;
};
