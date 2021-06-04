import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getContent, getQueryStringResults } from '@plone/volto/actions';
import { Pagination } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { isEqual } from 'lodash';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const ListingBody = React.memo(
  (props) => {
    const { data, properties, path, isEditMode, variation } = props;
    const content = properties;
    const { settings } = config;
    const { batch_size = settings.defaultPageSize } = data;

    const adaptedQuery = {
      ...(data.limit ? { limit: data.limit } : {}),
      ...(data.query ? { query: data.query } : {}),
      b_size: batch_size,
      fullobjects: 1,
    };

    const [currentPage, setCurrentPage] = React.useState(1);
    const querystringResults = useSelector(
      (state) => state.querystringsearch.subrequests,
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
      if (data?.query?.length > 0) {
        dispatch(getQueryStringResults(path, adaptedQuery, data.block));
      } else if (
        ((!data.variation && data.template === 'imageGallery') ||
          data.variation === 'imageGallery') &&
        data?.query?.length === 0
      ) {
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
            data.block,
          ),
        );
      }

      /* eslint-disable react-hooks/exhaustive-deps */
    }, [data]);

    const folderItems = content?.is_folderish ? content.items : [];

    const loadingQuery =
      data?.query?.length > 0 && querystringResults?.[data.block]?.loading;

    const listingItems =
      data?.query?.length > 0 && querystringResults?.[data.block]
        ? querystringResults?.[data.block]?.items || []
        : folderItems;

    let ListingBodyTemplate;
    // Legacy support if template is present
    if (data.template && !data.variation) {
      const variations =
        config.blocks?.blocksConfig['listing']?.variations || [];
      const legacyTemplateConfig = variations.find(
        (item) => item.id === data.template,
      );
      ListingBodyTemplate = legacyTemplateConfig.template;
    } else {
      ListingBodyTemplate = variation.template;
    }

    function handleContentPaginationChange(e, { activePage }) {
      !isEditMode && window.scrollTo(0, 0);
      setCurrentPage(activePage);
      dispatch(getContent(path, null, null, activePage));
    }

    function handleQueryPaginationChange(e, { activePage }) {
      !isEditMode && window.scrollTo(0, 0);
      setCurrentPage(activePage);
      dispatch(
        getQueryStringResults(path, adaptedQuery, data.block, activePage),
      );
    }

    return (
      <>
        {listingItems?.length > 0 ? (
          <>
            <ListingBodyTemplate
              items={listingItems}
              isEditMode={isEditMode}
              {...data}
            />
            {data?.query?.length === 0 && content?.items_total > batch_size && (
              <div className="pagination-wrapper">
                <Pagination
                  activePage={currentPage}
                  totalPages={Math.ceil(content.items_total / batch_size)}
                  onPageChange={handleContentPaginationChange}
                  firstItem={null}
                  lastItem={null}
                  prevItem={{
                    content: <Icon name={paginationLeftSVG} size="18px" />,
                    icon: true,
                    'aria-disabled': !content.batching.prev,
                    className: !content.batching.prev ? 'disabled' : null,
                  }}
                  nextItem={{
                    content: <Icon name={paginationRightSVG} size="18px" />,
                    icon: true,
                    'aria-disabled': !content.batching.next,
                    className: !content.batching.next ? 'disabled' : null,
                  }}
                />
              </div>
            )}
            {data?.query?.length > 0 &&
              querystringResults?.[data.block]?.total > batch_size && (
                <div className="pagination-wrapper">
                  <Pagination
                    activePage={currentPage}
                    totalPages={Math.ceil(
                      querystringResults[data.block].total / batch_size,
                    )}
                    onPageChange={handleQueryPaginationChange}
                    firstItem={null}
                    lastItem={null}
                    prevItem={{
                      content: <Icon name={paginationLeftSVG} size="18px" />,
                      icon: true,
                      'aria-disabled': !querystringResults[data.block].batching
                        .prev,
                      className: !querystringResults[data.block].batching.prev
                        ? 'disabled'
                        : null,
                    }}
                    nextItem={{
                      content: <Icon name={paginationRightSVG} size="18px" />,
                      icon: true,
                      'aria-disabled': !querystringResults[data.block].batching
                        .next,
                      className: !querystringResults[data.block].batching.next
                        ? 'disabled'
                        : null,
                    }}
                  />
                </div>
              )}
          </>
        ) : isEditMode ? (
          <div className="listing message">
            {data?.query?.length === 0 && (
              <FormattedMessage
                id="No items found in this container."
                defaultMessage="No items found in this container."
              />
            )}
            {!loadingQuery && data?.query?.length > 0 && (
              <FormattedMessage
                id="No results found."
                defaultMessage="No results found."
              />
            )}
          </div>
        ) : null}
      </>
    );
  },
  function areEqual(prevProps, nextProps) {
    return isEqual(prevProps.data, nextProps.data);
  },
);

ListingBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  path: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(ListingBody);
