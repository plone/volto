import React from 'react';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';

export const SEARCH_ENDPOINT_FIELDS = [
  'SearchableText',
  'b_size',
  'limit',
  'sort_on',
  'sort_order',
];

export const PAQO = 'plone.app.querystring.operation';

/**
 * Based on URL state, gets an initial internal state for the search
 */
export function getInitialState(data, facets, searchText, id) {
  const {
    types: facetWidgetTypes,
  } = config.blocks.blocksConfig.search.extensions.facetWidgets;
  const facetSettings = data?.facets || [];

  const defaultSort = getSort({
    sortOn: data?.query?.sort_on,
    sortOrder: data?.query?.sort_order,
    searchedText: searchText,
    toSearchText: searchText,
  });

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
      ...(searchText
        ? [
            {
              i: 'SearchableText',
              o: 'plone.app.querystring.operation.string.contains',
              v: searchText,
            },
          ]
        : []),
    ],
    sort_on: defaultSort.sortOn,
    sort_order: defaultSort.sortOrder,
    b_size: data.query?.b_size,
    limit: data.query?.limit,
    block: id,
  };
}

/**
 * "Normalizes" the search state to something that's serializable
 * (for querying) and used to compute data for the ListingBody
 */
export function normalizeState({
  query, // base query
  facets, // facet values
  id, // block id
  searchText, // SearchableText
  sortOn,
  sortOrder,
  facetSettings, // data.facets extracted from block data
}) {
  const {
    types: facetWidgetTypes,
  } = config.blocks.blocksConfig.search.extensions.facetWidgets;

  const params = {
    query: [
      ...(query.query || []),
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
    sort_on: sortOn === 'relevance' ? '' : sortOn ?? query.sort_on,
    sort_order: sortOn === 'relevance' ? '' : sortOrder ?? query.sort_order,
    b_size: query.b_size,
    limit: query.limit,
    block: id,
  };

  // TODO: need to check if SearchableText facet is not already in the query
  // Ideally the searchtext functionality should be restructured as being just
  // another facet
  params.query = params.query.reduce(
    // Remove SearchableText from query
    (acc, kvp) => (kvp.i === 'SearchableText' ? acc : [...acc, kvp]),
    [],
  );
  if (searchText) {
    params.query.push({
      i: 'SearchableText',
      o: 'plone.app.querystring.operation.string.contains',
      v: searchText,
    });
  }

  return params;
}

export const getQuerystringSearchFields = (searchData) => {
  return Object.assign(
    {},
    ...SEARCH_ENDPOINT_FIELDS.map((k) => {
      return searchData[k] !== undefined ? { [k]: searchData[k] } : {};
    }),
    searchData.query ? { query: serializeQuery(searchData['query']) } : {},
  );
};

// Simple compress/decompress the state in URL by replacing the lengthy string
export const deserializeQuery = (q) =>
  q
    ? JSON.parse(q)?.map((kvp) => ({
        ...kvp,
        o: kvp.o.replace(/^paqo/, PAQO),
      }))
    : [];
export const serializeQuery = (q) =>
  JSON.stringify(q?.map((kvp) => ({ ...kvp, o: kvp.o.replace(PAQO, 'paqo') })));

export const getSort = (args) => {
  const {
    toSortOn,
    toSortOrder,
    sortOn,
    sortOrder,
    searchedText,
    toSearchText,
  } = args;
  const res =
    toSearchText && toSearchText !== searchedText
      ? {
          sortOn: '',
          sortOrder: '',
        }
      : {
          sortOn: toSortOn || sortOn,
          sortOrder: toSortOrder || sortOrder,
        };
  // console.log('args', args, res);
  return res;
};

export const extractFacetValues = (data, query, state) => {
  const configuredFacets =
    data.facets?.map((facet) => facet?.field?.value) || [];
  const multiFacets = data.facets
    ?.filter((facet) => facet?.multiple)
    .map((facet) => facet?.field?.value);

  return Object.assign(
    {},
    ...query.map(({ i, v }) => ({ [i]: v })), // TODO: the 'o' should be kept. This would be a major refactoring of the facets

    // support for simple filters like ?Subject=something
    // TODO: since the move to hash params this is no longer working.
    // We'd have to treat the location.search and manage it just like the
    // hash, to support it. We can read it, but we'd have to reset it as
    // well, so at that point what's the difference to the hash?
    ...configuredFacets.map((f) =>
      state[f]
        ? {
            [f]: multiFacets.indexOf(f) > -1 ? [state[f]] : state[f],
          }
        : {},
    ),
  );
};

export function useDebounce() {
  const timeoutRef = React.useRef();

  const execute = React.useCallback((func, timeout) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(func, timeout);
  }, []);

  return execute;
}
