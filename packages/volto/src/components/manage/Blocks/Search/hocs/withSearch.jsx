import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';

import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';
import { usePrevious } from '@plone/volto/helpers';
import { isEqual } from 'lodash';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const SEARCH_ENDPOINT_FIELDS = [
  'SearchableText',
  'b_size',
  'limit',
  'sort_on',
  'sort_order',
];

const PAQO = 'plone.app.querystring.operation';

/**
 * Based on URL state, gets an initial internal state for the search
 *
 * @function getInitialState
 *
 */
function getInitialState(
  data,
  facets,
  urlSearchText,
  id,
  sortOnParam,
  sortOrderParam,
) {
  const { types: facetWidgetTypes } =
    config.blocks.blocksConfig.search.extensions.facetWidgets;
  const facetSettings = data?.facets || [];

  return {
    query: [
      ...(data.query?.query || []),
      ...(facetSettings || [])
        .map((facet) => {
          if (!facet?.field) return null;

          const { valueToQuery } = resolveExtension(
            'type',
            facetWidgetTypes,
            facet,
          );

          const name = facet.field.value;
          const value = facets[name];

          return valueToQuery({ value, facet });
        })
        .filter((f) => !!f),
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
    sort_on: sortOnParam || data.query?.sort_on,
    sort_order: sortOrderParam || data.query?.sort_order,
    b_size: data.query?.b_size,
    limit: data.query?.limit,
    block: id,
  };
}

/**
 * "Normalizes" the search state to something that's serializable
 * (for querying) and used to compute data for the ListingBody
 *
 * @function normalizeState
 *
 */
function normalizeState({
  query, // base query
  facets, // facet values
  id, // block id
  searchText, // SearchableText
  sortOn,
  sortOrder,
  facetSettings, // data.facets extracted from block data
}) {
  const { types: facetWidgetTypes } =
    config.blocks.blocksConfig.search.extensions.facetWidgets;

  // Here, we are removing the QueryString of the Listing ones, which is present in the Facet
  // because we already initialize the facet with those values.
  const configuredFacets = facetSettings
    ? facetSettings.map((facet) => facet?.field?.value)
    : [];

  let copyOfQuery = query.query ? [...query.query] : [];

  const queryWithoutFacet = copyOfQuery.filter((query) => {
    return !configuredFacets.includes(query.i);
  });

  const params = {
    query: [
      ...(queryWithoutFacet || []),
      ...(facetSettings || []).map((facet) => {
        if (!facet?.field) return null;

        const { valueToQuery } = resolveExtension(
          'type',
          facetWidgetTypes,
          facet,
        );

        const name = facet.field.value;
        const value = facets[name];

        return valueToQuery({ value, facet });
      }),
    ].filter((o) => !!o),
    sort_on: sortOn || query.sort_on,
    sort_order: sortOrder || query.sort_order,
    b_size: query.b_size,
    limit: query.limit,
    block: id,
  };

  // Note Ideally the searchtext functionality should be restructured as being just
  // another facet. But right now it's the same. This means that if a searchText
  // is provided, it will override the SearchableText facet.
  // If there is no searchText, the SearchableText in the query remains in effect.
  // TODO eventually the searchText should be a distinct facet from SearchableText, and
  // the two conditions could be combined, in comparison to the current state, when
  // one overrides the other.
  if (searchText) {
    params.query = params.query.reduce(
      // Remove SearchableText from query
      (acc, kvp) => (kvp.i === 'SearchableText' ? acc : [...acc, kvp]),
      [],
    );
    params.query.push({
      i: 'SearchableText',
      o: 'plone.app.querystring.operation.string.contains',
      v: searchText,
    });
  }

  return params;
}

const getSearchFields = (searchData) => {
  return Object.assign(
    {},
    ...SEARCH_ENDPOINT_FIELDS.map((k) => {
      return searchData[k] ? { [k]: searchData[k] } : {};
    }),
    searchData.query ? { query: serializeQuery(searchData['query']) } : {},
  );
};

/**
 * A hook that will mirror the search block state to a hash location
 */
const useHashState = () => {
  const location = useLocation();
  const history = useHistory();

  /**
   * Required to maintain parameter compatibility.
    With this we will maintain support for receiving hash (#) and search (?) type parameters.
  */
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
      const newParams = qs.parse(location.search);

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
          search: qs.stringify(newParams),
        });
      }
    },
    [history, oldState, location.search],
  );

  return [current, setSearchData];
};

/**
 * A hook to make it possible to switch disable mirroring the search block
 * state to the window location. When using the internal state we "start from
 * scratch", as it's intended to be used in the edit page.
 */
const useSearchBlockState = (uniqueId, isEditMode) => {
  const [hashState, setHashState] = useHashState();
  const [internalState, setInternalState] = React.useState({});

  return isEditMode
    ? [internalState, setInternalState]
    : [hashState, setHashState];
};

// Simple compress/decompress the state in URL by replacing the lengthy string
const deserializeQuery = (q) => {
  return JSON.parse(q)?.map((kvp) => ({
    ...kvp,
    o: kvp.o.replace(/^paqo/, PAQO),
  }));
};
const serializeQuery = (q) => {
  return JSON.stringify(
    q?.map((kvp) => ({ ...kvp, o: kvp.o.replace(PAQO, 'paqo') })),
  );
};

const withSearch = (options) => (WrappedComponent) => {
  const { inputDelay = 1000 } = options || {};

  function WithSearch(props) {
    const { data, id, editable = false } = props;

    const [locationSearchData, setLocationSearchData] = useSearchBlockState(
      id,
      editable,
    );

    // TODO: Improve the hook dependencies out of the scope of https://github.com/plone/volto/pull/4662
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const urlQuery = locationSearchData.query
      ? deserializeQuery(locationSearchData.query)
      : [];
    const urlSearchText =
      locationSearchData.SearchableText ||
      urlQuery.find(({ i }) => i === 'SearchableText')?.v ||
      '';

    // TODO: refactor, should use only useLocationStateManager()!!!
    const [searchText, setSearchText] = React.useState(urlSearchText);
    // TODO: Improve the hook dependencies out of the scope of https://github.com/plone/volto/pull/4662
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const configuredFacets =
      data.facets?.map((facet) => facet?.field?.value) || [];

    // Here we are getting the initial value of the facet if Listing Query contains the same criteria as
    // facet.
    const queryData = data?.query?.query
      ? deserializeQuery(JSON.stringify(data?.query?.query))
      : [];

    let intializeFacetWithQueryValue = [];

    for (let value of configuredFacets) {
      const queryString = queryData.find((item) => item.i === value);
      if (queryString) {
        intializeFacetWithQueryValue = [
          ...intializeFacetWithQueryValue,
          { [queryString.i]: queryString.v },
        ];
      }
    }

    const multiFacets = data.facets
      ?.filter((facet) => facet?.multiple)
      .map((facet) => facet?.field?.value);
    const [facets, setFacets] = React.useState(
      Object.assign(
        {},
        ...urlQuery.map(({ i, v }) => ({ [i]: v })),
        // TODO: the 'o' should be kept. This would be a major refactoring of the facets
        ...intializeFacetWithQueryValue,
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
    const previousUrlQuery = usePrevious(urlQuery);

    // During first render the previousUrlQuery is undefined and urlQuery
    // is empty so it ressetting the facet when you are navigating but during reload we have urlQuery and we need
    // to set the facet at first render.
    const preventOverrideOfFacetState =
      previousUrlQuery === undefined && urlQuery.length === 0;

    React.useEffect(() => {
      if (
        !isEqual(urlQuery, previousUrlQuery) &&
        !preventOverrideOfFacetState
      ) {
        setFacets(
          Object.assign(
            {},
            ...urlQuery.map(({ i, v }) => ({ [i]: v })), // TODO: the 'o' should be kept. This would be a major refactoring of the facets

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
      }
    }, [
      urlQuery,
      configuredFacets,
      locationSearchData,
      multiFacets,
      previousUrlQuery,
      preventOverrideOfFacetState,
    ]);

    const [sortOn, setSortOn] = React.useState(data?.query?.sort_on);
    const [sortOrder, setSortOrder] = React.useState(data?.query?.sort_order);

    const [searchData, setSearchData] = React.useState(
      getInitialState(data, facets, urlSearchText, id),
    );

    const deepFacets = JSON.stringify(facets);
    const deepData = JSON.stringify(data);
    React.useEffect(() => {
      setSearchData(
        getInitialState(
          JSON.parse(deepData),
          JSON.parse(deepFacets),
          urlSearchText,
          id,
          sortOn,
          sortOrder,
        ),
      );
    }, [deepData, deepFacets, urlSearchText, id, sortOn, sortOrder]);

    const timeoutRef = React.useRef();
    const facetSettings = data?.facets;

    const deepQuery = JSON.stringify(data.query);
    const onTriggerSearch = React.useCallback(
      (
        toSearchText = undefined,
        toSearchFacets = undefined,
        toSortOn = undefined,
        toSortOrder = undefined,
      ) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => {
            const newSearchData = normalizeState({
              id,
              query: data.query || {},
              facets: toSearchFacets || facets,
              searchText: toSearchText ? toSearchText.trim() : '',
              sortOn: toSortOn || sortOn,
              sortOrder: toSortOrder || sortOrder,
              facetSettings,
            });
            if (toSearchFacets) setFacets(toSearchFacets);
            if (toSortOn) setSortOn(toSortOn);
            if (toSortOrder) setSortOrder(toSortOrder);
            setSearchData(newSearchData);
            setLocationSearchData(getSearchFields(newSearchData));
          },
          toSearchFacets ? inputDelay / 3 : inputDelay,
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        // Use deep comparison of data.query
        deepQuery,
        facets,
        id,
        setLocationSearchData,
        searchText,
        sortOn,
        sortOrder,
        facetSettings,
      ],
    );

    const removeSearchQuery = () => {
      let newSearchData = { ...searchData };
      newSearchData.query = searchData.query.reduce(
        // Remove SearchableText from query
        (acc, kvp) => (kvp.i === 'SearchableText' ? acc : [...acc, kvp]),
        [],
      );
      setSearchData(newSearchData);
      setLocationSearchData(getSearchFields(newSearchData));
    };

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const totalItems =
      querystringResults[id]?.total || querystringResults[id]?.items?.length;

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
        removeSearchQuery={removeSearchQuery}
        setSearchText={setSearchText}
        onTriggerSearch={onTriggerSearch}
        totalItems={totalItems}
      />
    );
  }
  WithSearch.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;

  return WithSearch;
};

export default withSearch;
