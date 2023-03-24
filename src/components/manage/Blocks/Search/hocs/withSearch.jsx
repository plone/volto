import React from 'react';
import { useSelector } from 'react-redux';

import useSearchBlockState from './useSearchBlockState';
import {
  deserializeQuery,
  extractFacetValues,
  getInitialState,
  getSearchFields,
  getSort,
  normalizeState,
} from './utils';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withSearch = (options) => (WrappedComponent) => {
  // TODO: refactor, should use only useLocationStateManager()!!!

  const { inputDelay = 1000 } = options || {};

  function WithSearch(props) {
    const { data, id, editable = false } = props;

    const [locationSearchData, setLocationSearchData] = useSearchBlockState(
      id,
      editable,
    );

    const query = deserializeQuery(locationSearchData.query);
    const searchedText =
      locationSearchData.SearchableText ||
      query.find(({ i }) => i === 'SearchableText')?.v ||
      '';
    const defaultFacets = extractFacetValues(data, query, locationSearchData);

    const [cachedSearchText, setLocalSearchText] = React.useState(searchedText);
    const [facets, setFacets] = React.useState(defaultFacets);
    const [sortOn, setSortOn] = React.useState(data?.query?.sort_on);
    const [sortOrder, setSortOrder] = React.useState(data?.query?.sort_order);
    const [cachedSearchData, setCachedSearchData] = React.useState(
      getInitialState(data, defaultFacets, searchedText, id),
    );

    const timeoutRef = React.useRef();
    const facetSettings = data?.facets;

    const onTriggerSearch = React.useCallback(
      (args) => {
        const { toSearchText, toSearchFacets, toSortOn, toSortOrder } = args;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => {
            const sortOnData = getSort({
              ...args,
              sortOn,
              sortOrder,
              searchedText,
            });
            const searchData = normalizeState({
              id,
              query: data.query || {},
              facets: toSearchFacets || facets,
              searchText: toSearchText,
              ...sortOnData,
              facetSettings,
            });

            if (toSearchFacets) setFacets(toSearchFacets);
            if (sortOnData.sortOn !== sortOn) {
              setSortOn(toSortOn);
            }
            if (sortOnData.sortOrder !== toSortOrder) {
              setSortOrder(toSortOrder);
            }

            setCachedSearchData(searchData); // store internal state, can be passed to children
            setLocationSearchData(getSearchFields(searchData)); // store in URL
          },
          toSearchFacets ? inputDelay / 3 : inputDelay,
        );
      },
      [
        data.query,
        facets,
        id,
        setLocationSearchData,
        sortOn,
        sortOrder,
        facetSettings,
        searchedText,
      ],
    );

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const totalItems =
      querystringResults[id]?.total || querystringResults[id]?.items?.length;

    return (
      <WrappedComponent
        {...props}
        searchData={cachedSearchData}
        facets={facets}
        setFacets={setFacets}
        setSortOn={setSortOn}
        setSortOrder={setSortOrder}
        sortOn={sortOn}
        sortOrder={sortOrder}
        searchedText={searchedText}
        searchText={cachedSearchText}
        setSearchText={setLocalSearchText}
        onTriggerSearch={onTriggerSearch}
        totalItems={totalItems}
      />
    );
  }
  WithSearch.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;

  return WithSearch;
};

export default withSearch;
