import React, { createRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Pagination, Dimmer, Loader } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import withQuerystringResults from './withQuerystringResults';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const ListingBody = withQuerystringResults((props) => {
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
  const variations = config.blocks?.blocksConfig['listing']?.variations || [];
  const defaultVariation = variations.filter((item) => item.isDefault)?.[0];

  if (data.template && !data.variation) {
    const legacyTemplateConfig = variations.find(
      (item) => item.id === data.template,
    );
    ListingBodyTemplate = legacyTemplateConfig.template;
  } else {
    ListingBodyTemplate =
      variation?.template ?? defaultVariation?.template ?? null;
  }

  const listingRef = createRef();

  return listingItems?.length > 0 ? (
    <div ref={listingRef}>
      <ListingBodyTemplate
        items={listingItems}
        isEditMode={isEditMode}
        {...data}
        {...variation}
      />
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => {
              !isEditMode &&
                listingRef.current.scrollIntoView({ behavior: 'smooth' });
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
    </div>
  ) : isEditMode ? (
    <div className="listing message" ref={listingRef}>
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
      <Dimmer active={!hasLoaded} inverted>
        <Loader indeterminate size="small">
          <FormattedMessage id="loading" defaultMessage="Loading" />
        </Loader>
      </Dimmer>
    </div>
  ) : (
    <div>
      {hasLoaded && (
        <FormattedMessage
          id="No results found."
          defaultMessage="No results found."
        />
      )}
      <Dimmer active={!hasLoaded} inverted>
        <Loader indeterminate size="small">
          <FormattedMessage id="loading" defaultMessage="Loading" />
        </Loader>
      </Dimmer>
    </div>
  );
});

export default injectIntl(ListingBody);
