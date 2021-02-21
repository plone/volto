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
