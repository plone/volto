import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Pagination } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import withQuerystringResults from './withQuerystringResults';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const ListingBody = withQuerystringResults((props) => {
  // console.log('props', props);
  const {
    data = {},
    isEditMode,
    listingItems,
    totalPages,
    onPaginationChange,
    variation,
    currentPage,
    prevBatch,
    nextBatch,
    isFolderContentsListing,
    hasLoaded,
  } = props;

  let ListingBodyTemplate;
  // Legacy support if template is present
  if (data.template && !data.variation) {
    const variations = config.blocks?.blocksConfig['listing']?.variations || [];
    const legacyTemplateConfig = variations.find(
      (item) => item.id === data.template,
    );
    ListingBodyTemplate = legacyTemplateConfig.template;
  } else {
    ListingBodyTemplate = variation.template;
  }

  return listingItems?.length > 0 ? (
    <>
      <ListingBodyTemplate
        items={listingItems}
        isEditMode={isEditMode}
        {...data}
      />
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => {
              !isEditMode && window.scrollTo(0, 0);
              onPaginationChange(e, { activePage });
            }}
            firstItem={null}
            lastItem={null}
            prevItem={{
              content: <Icon name={paginationLeftSVG} size="18px" />,
              icon: true,
              'aria-disabled': !prevBatch,
              className: !prevBatch ? 'disabled' : null,
            }}
            nextItem={{
              content: <Icon name={paginationRightSVG} size="18px" />,
              icon: true,
              'aria-disabled': !nextBatch,
              className: !nextBatch ? 'disabled' : null,
            }}
          />
        </div>
      )}
    </>
  ) : isEditMode ? (
    <div className="listing message">
      {isFolderContentsListing && (
        <FormattedMessage
          id="No items found in this container."
          defaultMessage="No items found in this container."
        />
      )}
      {hasLoaded && (
        <FormattedMessage
          id="No results found."
          defaultMessage="No results found."
        />
      )}
    </div>
  ) : null;
});

export default injectIntl(ListingBody);
