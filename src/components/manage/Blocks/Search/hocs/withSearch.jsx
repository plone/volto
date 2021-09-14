import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

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

function getSearchData(query, facets, id, searchText, sortOn, sortOrder) {
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

const urlFields = [
  'sort_on',
  'sort_order',
  'b_size',
  'limit',
  'SearchableText',
];
const getSearchFields = (searchData) => {
  return Object.assign(
    {},
    ...urlFields.map((k) => {
      return searchData[k] ? { [k]: searchData[k] } : {};
    }),
    searchData.query ? { query: JSON.stringify(searchData['query']) } : {},
  );
};

const useLocationStateManager = () => {
  const location = useLocation();
  const history = useHistory();

  const oldState = new URLSearchParams(location.hash);
  const current = Object.assign(
    {},
    ...Array.from(oldState.keys()).map((k) => ({ [k]: oldState.get(k) })),
  );

  const setSearchData = React.useCallback(
    (searchData) => {
      const newParams = new URLSearchParams(location.hash);

      let changed = false;

      Object.keys(searchData)
        .sort()
        .forEach((k) => {
          if (searchData[k]) {
            newParams.set(k, searchData[k]);
            if (oldState.get(k) !== searchData[k]) {
              changed = true;
            }
          }
        });

      if (changed)
        history.push({
          hash: newParams.toString(),
          search: location.search,
        });
    },
    [history, oldState, location.hash, location.search],
  );

  return [current, setSearchData];
};

const withSearch = (options) => (WrappedComponent) => {
  const { inputDelay = 1000 } = options || {};
  return (props) => {
    const { data, id } = props;

    const [
      locationSearchData,
      setLocationSearchData,
    ] = useLocationStateManager();

    const urlSearchText = locationSearchData.SearchableText || '';
    const urlQuery = locationSearchData.query
      ? JSON.parse(locationSearchData.query)
      : [];

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const totalItems =
      querystringResults[id]?.total || querystringResults[id]?.items?.length;

    // TODO: should use only useLocationStateManager()
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
        // supporting simple filters like ?Subject=something
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

    const [sortOn, setSortOn] = React.useState(data?.query.sort_on);
    const [sortOrder, setSortOrder] = React.useState(data?.query.sort_order);

    const [searchData, setSearchData] = React.useState(
      getInitialState(data, facets, urlSearchText, id),
    );

    const timeoutRef = React.useRef();

    const updateSearchParams = React.useCallback(
      (toSearch, toSearchFacets, toSortOn, toSortOrder) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(
          () => {
            const searchData = getSearchData(
              data.query || {},
              toSearchFacets || facets,
              id,
              toSearch,
              toSortOn || sortOn,
              toSortOrder || sortOrder,
            );
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
        onTriggerSearch={updateSearchParams}
        totalItems={totalItems}
      />
    );
  };
};

export default withSearch;
