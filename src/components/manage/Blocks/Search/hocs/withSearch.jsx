import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

/**
 * Get the initial state for the search terms/facets, based on block data and
 * URL
 */
function getInitialState(data, facets, urlSearchText, id) {
  return {
    query: [
      ...(data.query?.query || []),
      ...Object.keys(facets).map((name) => ({
        i: name,
        v: facets[name],

        // TODO: make the facet operator pluggable
        o: 'plone.app.querystring.operation.selection.is',
      })),
      ...(urlSearchText
        ? [
            {
              i: 'SearchableText',
              o: 'plone.app.querystring.operation.string.contains',
              v: urlSearchText,
            },
          ]
        : []),
    ],
    sort_on: data.query?.sort_on,
    sort_order: data.query?.sort_order,
    b_size: data.query?.b_size,
    limit: data.query?.limit,
    block: id,
  };
}

function getSearchEndpointParams({
  query,
  facets,
  id,
  searchText,
  sortOn,
  sortOrder,
}) {
  const res = {
    query: [
      ...(query.query || []),
      ...Object.keys(facets).map((name) =>
        !isEmpty(facets[name])
          ? {
              i: name,
              o: Array.isArray(facets[name])
                ? 'plone.app.querystring.operation.list.contains'
                : 'plone.app.querystring.operation.selection.is',
              v: facets[name],
            }
          : undefined,
      ),
    ].filter((o) => !!o),
    sort_on: sortOn || query.sort_on,
    sort_order: sortOrder || query.sort_order,
    b_size: query.b_size,
    limit: query.limit,
    block: id,
  };

  if (searchText) {
    res.query.push({
      i: 'SearchableText',
      o: 'plone.app.querystring.operation.string.contains',
      v: searchText,
    });
  }

  return res;
}

const searchEndpointFields = [
  'sort_on',
  'sort_order',
  'b_size',
  'limit',
  'SearchableText',
];

const getSearchFields = (searchData) => {
  return Object.assign(
    {},
    ...searchEndpointFields.map((k) => {
      return searchData[k] ? { [k]: searchData[k] } : {};
    }),
    searchData.query ? { query: JSON.stringify(searchData['query']) } : {},
  );
};

const useHashState = () => {
  const location = useLocation();
  const history = useHistory();

  const oldState = React.useMemo(() => qs.parse(location.hash), [
    location.hash,
  ]);

  // This creates a shallow copy. Why is this needed?
  const current = Object.assign(
    {},
    ...Array.from(Object.keys(oldState)).map((k) => ({ [k]: oldState[k] })),
  );
  const setSearchData = React.useCallback(
    (searchData) => {
      const newParams = qs.parse(location.hash);

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
          hash: qs.stringify(newParams),
          // TODO: handle ?Subject= and ?SearchableText=
          // search: location.search,
        });
      }
    },
    [history, oldState, location.hash],
  );

  return [current, setSearchData];
};

const useSearchBlockState = (uniqueId, isEditMode) => {
  const location = useLocation();
  const [hashState, setHashState] = useHashState(qs.parse(location.hash));
  const [internalState, setInternalState] = React.useState({});

  return isEditMode
    ? [internalState, setInternalState]
    : [hashState, setHashState];
};

const withSearch = (options) => (WrappedComponent) => {
  const { inputDelay = 1000 } = options || {};
  return (props) => {
    const { data, id, editable = false } = props;

    const [locationSearchData, setLocationSearchData] = useSearchBlockState(
      id,
      editable,
    );

    const urlQuery = locationSearchData.query
      ? JSON.parse(locationSearchData.query)
      : [];
    const urlSearchText = locationSearchData.SearchableText || '';

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const totalItems =
      querystringResults[id]?.total || querystringResults[id]?.items?.length;

    // TODO: refactor, should use only useLocationStateManager()!!!
    const [searchText, setSearchText] = React.useState(urlSearchText);
    const configuredFacets =
      data.facets?.map((facet) => facet?.field?.value) || [];
    const multiFacets = data.facets
      ?.filter((facet) => facet?.multiple)
      .map((facet) => facet?.field?.value);
    const [facets, setFacets] = React.useState(
      Object.assign(
        {},
        ...urlQuery.map(({ i, v }) => ({ [i]: v })),

        // support for simple filters like ?Subject=something
        // TODO: since the move to hash params this is no longer working.
        // We'd have to treat the location.search and manage it just like the
        // hash, to support it. We can read it, but we'd have to reset it as
        // well, so at that point what's the difference to the hash?
        ...configuredFacets.map((f) =>
          locationSearchData[f]
            ? {
                [f]:
                  multiFacets.indexOf(f) > -1
                    ? [locationSearchData[f]]
                    : locationSearchData[f],
              }
            : {},
        ),
      ),
    );

    const [sortOn, setSortOn] = React.useState(data?.query?.sort_on);
    const [sortOrder, setSortOrder] = React.useState(data?.query?.sort_order);

    const [searchData, setSearchData] = React.useState(
      getInitialState(data, facets, urlSearchText, id),
    );

    const timeoutRef = React.useRef();

    const onTriggerSearch = React.useCallback(
      (toSearch, toSearchFacets, toSortOn, toSortOrder) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => {
            const searchData = getSearchEndpointParams({
              query: data.query || {},
              facets: toSearchFacets || facets,
              id,
              searchText: toSearch,
              sortOn: toSortOn || sortOn,
              sortOrder: toSortOrder || sortOrder,
            });
            if (toSearchFacets) setFacets(toSearchFacets);
            if (toSortOn) setSortOn(toSortOn);
            if (toSortOrder) setSortOrder(toSortOrder);
            setSearchData(searchData);
            setLocationSearchData(getSearchFields(searchData));
          },
          toSearchFacets ? inputDelay / 3 : inputDelay,
        );
      },
      [data.query, facets, id, setLocationSearchData, sortOn, sortOrder],
    );

    return (
      <WrappedComponent
        {...props}
        searchData={searchData}
        facets={facets}
        setFacets={setFacets}
        setSortOn={setSortOn}
        setSortOrder={setSortOrder}
        sortOn={sortOn}
        sortOrder={sortOrder}
        searchedText={urlSearchText}
        searchText={searchText}
        setSearchText={setSearchText}
        onTriggerSearch={onTriggerSearch}
        totalItems={totalItems}
      />
    );
  };
};

export default withSearch;
