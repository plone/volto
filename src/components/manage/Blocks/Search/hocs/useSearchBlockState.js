import React from 'react';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

/**
 * A HOC that will mirror the search block state to a hash location
 */
const useHashState = () => {
  const location = useLocation();
  const history = useHistory();

  const storeName = 'search'; // can be changed to 'hash'
  const storage = location[storeName];

  const oldState = React.useMemo(() => {
    return {
      ...qs.parse(location.search),
      ...qs.parse(location.hash),
    };
  }, [location.hash, location.search]);

  // This creates a shallow copy. Why is this needed?
  const current = Object.assign(
    {},
    ...Array.from(Object.keys(oldState)).map((k) => ({ [k]: oldState[k] })),
  );

  const setSearchData = React.useCallback(
    (searchData) => {
      const newParams = qs.parse(storage);

      let changed = false;

      Object.keys(searchData)
        .sort()
        .forEach((k) => {
          if (searchData[k]) {
            newParams[k] = searchData[k];
            if (oldState[k] !== searchData[k]) {
              changed = true;
            }
          }
        });

      if (changed) {
        history.push({
          [storeName]: qs.stringify(newParams),
        });
      }
    },
    [history, oldState, storage],
  );

  return [current, setSearchData];
};

/**
 * A hook to make it possible to switch disable mirroring the search block
 * state to the window location. When using the internal state we "start from
 * scratch", as it's intended to be used in the edit page.
 */
export default function useSearchBlockState(uniqueId, isEditMode) {
  const [hashState, setHashState] = useHashState();
  const [internalState, setInternalState] = React.useState({});

  return isEditMode
    ? [internalState, setInternalState]
    : [hashState, setHashState];
}
