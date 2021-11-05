import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { getContent, getQueryStringResults } from '@plone/volto/actions';
import { usePrevious } from '@plone/volto/helpers';
import { isEqual } from 'lodash';

import config from '@plone/volto/registry';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const useQueryPagination = (querystring) => {
  const previousQuerystring = usePrevious(querystring);
  const [currentPage, setCurrentPage] = React.useState(1);

  useDeepCompareEffect(() => {
    setCurrentPage(1);
  }, [querystring, previousQuerystring]);

  return {
    currentPage:
      previousQuerystring && !isEqual(previousQuerystring, querystring)
        ? 1
        : currentPage,
    setCurrentPage,
  };
};

export default function withQuerystringResults(WrappedComponent) {
  function WithQuerystringResults(props) {
    const { data = {}, properties: content, path } = props;
    const { settings } = config;
    const querystring = data.querystring || data; // For backwards compat with data saved before Blocks schema. Note, this is also how the Search block passes data to ListingBody

    const { block } = data;
    const { b_size = settings.defaultPageSize } = querystring; // batchsize

    // save the path so it won't trigger dispatch on eager router location change
    const [initialPath] = React.useState(path);

    const copyFields = ['limit', 'query', 'sort_on', 'sort_order', 'depth'];

    const adaptedQuery = Object.assign(
      {
        b_size: b_size,
        fullobjects: 1,
      },
      ...copyFields.map((name) =>
        Object.keys(querystring).includes(name)
          ? { [name]: querystring[name] }
          : {},
      ),
    );
    const { currentPage, setCurrentPage } = useQueryPagination(querystring);
    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const dispatch = useDispatch();

    const folderItems = content?.is_folderish ? content.items : [];
    const hasQuery = querystring?.query?.length > 0;
    const hasLoaded = hasQuery ? !querystringResults?.[block]?.loading : true;

    const listingItems =
      querystring?.query?.length > 0 && querystringResults?.[block]
        ? querystringResults?.[block]?.items || []
        : folderItems;

    const showAsFolderListing = !hasQuery && content?.items_total > b_size;
    const showAsQueryListing =
      hasQuery && querystringResults?.[block]?.total > b_size;

    const totalPages = showAsFolderListing
      ? Math.ceil(content.items_total / b_size)
      : showAsQueryListing
      ? Math.ceil(querystringResults[block].total / b_size)
      : 0;

    const prevBatch = showAsFolderListing
      ? content.batching?.prev
      : showAsQueryListing
      ? querystringResults[block].batching?.prev
      : null;
    const nextBatch = showAsFolderListing
      ? content.batching?.next
      : showAsQueryListing
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
        dispatch(getContent(initialPath, null, null, currentPage));
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
