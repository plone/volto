import React from 'react';
import { useSelector } from 'react-redux';

import useSearchBlockState from './useSearchBlockState';
import {
  deserializeQuery,
  extractFacetValues,
  getInitialState,
  getQuerystringSearchFields,
  getSort,
  normalizeState,
  useDebounce,
} from './utils';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// TODO: refactor, should use only useLocationStateManager()!!!
const withSearch = (options) => (WrappedComponent) => {
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

    const [cachedSearchText, setCachedSearchText] = React.useState(
      searchedText,
    );
    const [facets, setFacets] = React.useState(defaultFacets);
    const [cachedSearchData, setCachedSearchData] = React.useState(
      getInitialState(data, defaultFacets, searchedText, id),
    );
    const [sortOn, setSortOn] = React.useState(cachedSearchData.sort_on);
    const [sortOrder, setSortOrder] = React.useState(
      cachedSearchData.sort_order,
    );

    const facetSettings = data?.facets;
    const debounce = useDebounce();

    const onTriggerSearch = React.useCallback(
      function (toSearchText, toSearchFacets, toSortOn, toSortOrder) {
        const handler = () => {
          const sortOnData = getSort({
            toSortOn,
            toSortOrder,
            sortOn,
            sortOrder,
            searchedText,
            toSearchText,
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
          if (sortOnData.sortOn !== sortOn) setSortOn(toSortOn);
          if (sortOnData.sortOrder !== toSortOrder) setSortOrder(toSortOrder);

          // console.log('onTriggerSearch', [
          //   toSearchText,
          //   toSearchFacets,
          //   toSortOn,
          //   toSortOrder,
          //   searchData,
          // ]);

          setCachedSearchData(searchData); // store internal state, can be passed to children
          setLocationSearchData(getQuerystringSearchFields(searchData)); // store in URL
        };
        debounce(handler, toSearchFacets ? inputDelay / 3 : inputDelay);
      },
      [
        debounce,
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
        setSearchText={setCachedSearchText}
        onTriggerSearch={onTriggerSearch}
        totalItems={totalItems}
      />
    );
  }
  WithSearch.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;

  return WithSearch;
};

export default withSearch;
