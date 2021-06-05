import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { getContent, getQueryStringResults } from '@plone/volto/actions';
import { useDispatch, useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import useDeepCompareEffect from 'use-deep-compare-effect';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withQuerystringResults(WrappedComponent) {
  function WithQuerystringResults(props) {
    const { data = {}, properties: content, path } = props;
    const { settings } = config;
    const { block, batch_size = settings.defaultPageSize } = data;

    const copyFields = ['limit', 'query', 'sort_on', 'sort_order', 'depth'];

    const adaptedQuery = Object.assign(
      {
        b_size: batch_size,
        fullobjects: 1,
      },
      ...copyFields.map((name) =>
        Object.keys(data).includes(name) ? { [name]: data[name] } : {},
      ),
    );
    const [currentPage, setCurrentPage] = React.useState(1);
    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const dispatch = useDispatch();

    const folderItems = content?.is_folderish ? content.items : [];

    const hasQuery = data?.query?.length > 0;
    const loadingQuery = hasQuery && querystringResults?.[block]?.loading;

    const hasLoaded = loadingQuery && data?.query?.length > 0;

    const listingItems =
      data?.query?.length > 0 && querystringResults?.[block]
        ? querystringResults?.[block]?.items || []
        : folderItems;

    const showAsFolderListing = !hasQuery && content?.items_total > batch_size;
    const showAsQueryListing =
      hasQuery && querystringResults?.[block]?.total > batch_size;

    const totalPages = showAsFolderListing
      ? Math.ceil(content.items_total / batch_size)
      : showAsQueryListing
      ? Math.ceil(querystringResults[block].total / batch_size)
      : 0;

    const prevBatch = showAsFolderListing
      ? content.batching.prev
      : showAsQueryListing
      ? querystringResults[block].batching.prev
      : null;
    const nextBatch = showAsFolderListing
      ? content.batching.next
      : showAsQueryListing
      ? querystringResults[block].batching.next
      : null;

    function handleContentPaginationChange(e, { activePage }) {
      // !isEditMode && window.scrollTo(0, 0);
      setCurrentPage(activePage);
      dispatch(getContent(path, null, null, activePage));
    }

    function handleQueryPaginationChange(e, { activePage }) {
      // !isEditMode && window.scrollTo(0, 0);
      setCurrentPage(activePage);
      dispatch(getQueryStringResults(path, adaptedQuery, block, activePage));
    }

    const isImageGallery =
      (!data.variation && data.template === 'imageGallery') ||
      data.variation === 'imageGallery';

    useDeepCompareEffect(() => {
      if (hasQuery) {
        dispatch(getQueryStringResults(path, adaptedQuery, block));
      } else if (isImageGallery && !hasQuery) {
        // when used as image gallery, it doesn't need a query to list children
        dispatch(
          getQueryStringResults(
            path,
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
      }
    }, [block, isImageGallery, adaptedQuery, hasQuery, path, dispatch]);

    return (
      <WrappedComponent
        {...props}
        onPaginationChange={(e, { activePage }) => {
          showAsFolderListing
            ? handleContentPaginationChange(e, { activePage })
            : handleQueryPaginationChange(e, { activePage });
        }}
        total={querystringResults?.[block]?.total}
        batch_size={batch_size}
        currentPage={currentPage}
        totalPages={totalPages}
        prevBatch={prevBatch}
        nextBatch={nextBatch}
        items={listingItems}
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
