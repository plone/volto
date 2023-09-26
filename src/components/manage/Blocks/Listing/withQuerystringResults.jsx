import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { getContent, getQueryStringResults } from '@plone/volto/actions';
import { usePagination, getBaseUrl } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withQuerystringResults(WrappedComponent) {
  function WithQuerystringResults(props) {
    const {
      data = {},
      id = data.block,
      properties: content,
      path,
      variation,
    } = props;
    const { settings } = config;
    const querystring = data.querystring || data; // For backwards compat with data saved before Blocks schema. Note, this is also how the Search block passes data to ListingBody
    const subrequestID = content?.UID ? `${content?.UID}-${id}` : id;
    const { b_size = settings.defaultPageSize } = querystring; // batchsize

    // save the path so it won't trigger dispatch on eager router location change
    const [initialPath] = React.useState(getBaseUrl(path));

    const copyFields = ['limit', 'query', 'sort_on', 'sort_order', 'depth'];
    const { currentPage, setCurrentPage } = usePagination(id, 1);
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
    const adaptedQueryRef = useRef(adaptedQuery);
    const currentPageRef = useRef(currentPage);

    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const dispatch = useDispatch();

    const folderItems = content?.is_folderish ? content.items : [];
    const hasQuery = querystring?.query?.length > 0;
    const hasLoaded = hasQuery
      ? querystringResults?.[subrequestID]?.loaded
      : true;

    const listingItems = hasQuery
      ? querystringResults?.[subrequestID]?.items || []
      : folderItems;

    const showAsFolderListing = !hasQuery && content?.items_total > b_size;
    const showAsQueryListing =
      hasQuery && querystringResults?.[subrequestID]?.total > b_size;

    const totalPages = showAsFolderListing
      ? Math.ceil(content.items_total / b_size)
      : showAsQueryListing
      ? Math.ceil(querystringResults[subrequestID].total / b_size)
      : 0;

    const prevBatch = showAsFolderListing
      ? content.batching?.prev
      : showAsQueryListing
      ? querystringResults[subrequestID].batching?.prev
      : null;
    const nextBatch = showAsFolderListing
      ? content.batching?.next
      : showAsQueryListing
      ? querystringResults[subrequestID].batching?.next
      : null;

    const isImageGallery =
      (!data.variation && data.template === 'imageGallery') ||
      data.variation === 'imageGallery';

    useDeepCompareEffect(() => {
      if (hasQuery) {
        dispatch(
          getQueryStringResults(
            initialPath,
            adaptedQuery,
            subrequestID,
            currentPage,
          ),
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
            subrequestID,
          ),
        );
      } else {
        dispatch(getContent(initialPath, null, null, currentPage));
      }
      adaptedQueryRef.current = adaptedQuery;
      currentPageRef.current = currentPage;
    }, [
      subrequestID,
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
        total={querystringResults?.[subrequestID]?.total}
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
