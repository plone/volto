import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { getQueryStringResults } from '@plone/volto/actions';
import { usePagination, getBaseUrl } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

export const defaultQuery = [
  {
    i: 'path',
    o: 'plone.app.querystring.operation.string.relativePath',
    v: '::1',
  },
];

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withQuerystringResults(WrappedComponent) {
  function WithQuerystringResults(props) {
    const { data = {}, path, variation } = props;
    const { settings } = config;
    const querystring = data.querystring || data; // For backwards compat with data saved before Blocks schema. Note, this is also how the Search block passes data to ListingBody

    const { block } = data;
    const { b_size = settings.defaultPageSize } = querystring; // batchsize

    // save the path so it won't trigger dispatch on eager router location change
    const [initialPath] = React.useState(getBaseUrl(path));

    const copyFields = ['limit', 'query', 'sort_on', 'sort_order', 'depth'];
    const { currentPage, setCurrentPage } = usePagination(data.block, 1);
    const adaptedQuery = Object.assign(
      variation?.fullobjects ? { fullobjects: 1 } : { metadata_fields: '_all' },
      {
        b_size: b_size,
      },
      ...copyFields.map((name) =>
        Object.keys(querystring).includes(name)
          ? { [name]: querystring[name] }
          : {},
      ),
    );
    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const dispatch = useDispatch();

    const hasQuery = querystring?.query?.length > 0;
    const hasLoaded = !querystringResults?.[block]?.loading;

    const listingItems = querystringResults?.[block]?.items || [];

    const showAsQueryListing = querystringResults?.[block]?.total > b_size;
    const showAsFolderListing = !hasQuery && showAsQueryListing;

    const totalPages = showAsQueryListing
      ? Math.ceil(querystringResults[block].total / b_size)
      : 0;

    const prevBatch = showAsQueryListing
      ? querystringResults[block].batching?.prev
      : null;
    const nextBatch = showAsQueryListing
      ? querystringResults[block].batching?.next
      : null;

    const isImageGallery =
      (!data.variation && data.template === 'imageGallery') ||
      data.variation === 'imageGallery';

    useDeepCompareEffect(() => {
      if (hasQuery) {
        dispatch(
          getQueryStringResults(initialPath, adaptedQuery, block, currentPage),
        );
      } else if (isImageGallery && !hasQuery) {
        // when used as image gallery, it doesn't need a query to list children
        dispatch(
          getQueryStringResults(
            initialPath,
            {
              ...adaptedQuery,
              b_size: 10000000000,
              query: [
                {
                  i: 'path',
                  o: 'plone.app.querystring.operation.string.relativePath',
                  v: '',
                },
              ],
            },
            block,
          ),
        );
      } else {
        dispatch(
          getQueryStringResults(
            initialPath,
            {
              ...adaptedQuery,
              sort_on: 'getObjPositionInParent',
              query: defaultQuery,
            },
            block,
            currentPage,
          ),
        );
      }
    }, [
      block,
      isImageGallery,
      adaptedQuery,
      hasQuery,
      initialPath,
      dispatch,
      currentPage,
    ]);

    return (
      <WrappedComponent
        {...props}
        onPaginationChange={(e, { activePage }) => setCurrentPage(activePage)}
        total={querystringResults?.[block]?.total}
        batch_size={b_size}
        currentPage={currentPage}
        totalPages={totalPages}
        prevBatch={prevBatch}
        nextBatch={nextBatch}
        listingItems={listingItems}
        hasLoaded={hasLoaded}
        isFolderContentsListing={showAsFolderListing}
      />
    );
  }

  WithQuerystringResults.displayName = `WithQuerystringResults(${getDisplayName(
    WrappedComponent,
  )})`;

  return hoistNonReactStatics(WithQuerystringResults, WrappedComponent);
}
