import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getQueryStringResults } from '@plone/volto/actions';
import { blocks } from '~/config';

const ListingBody = ({ data, properties, intl, path, isEditMode }) => {
  const querystringResults = useSelector(
    state => state.querystringsearch.subrequests,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.query?.length > 0) {
      dispatch(
        getQueryStringResults(path, { ...data, fullobjects: 1 }, data.block),
      );
    }
  }, [dispatch, data, data.block, path]);

  const folderItems = properties.is_folderish ? properties.items : [];

  const listingItems =
    data?.query?.length > 0
      ? (querystringResults &&
          querystringResults[data.block] &&
          querystringResults[data.block].items) ||
        []
      : folderItems;

  const templateConfig = blocks?.blocksConfig?.listing?.templates;

  let templateName =
    data.template && Object.keys(templateConfig).indexOf(data.template) >= 0
      ? data.template
      : 'default';

  const ListingBodyTemplate = templateConfig[templateName].template;

  return (
    <>
      {listingItems.length > 0 ? (
        <ListingBodyTemplate
          items={listingItems}
          isEditMode={isEditMode}
          {...data}
        />
      ) : (
        <div className="listing message">
          {data?.query?.length === 0 && (
            <FormattedMessage
              id="No items found in this container."
              defaultMessage="No items found in this container."
            />
          )}
          {data?.query?.length > 0 && (
            <FormattedMessage
              id="No results found."
              defaultMessage="No results found."
            />
          )}
        </div>
      )}
    </>
  );
};

ListingBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  path: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
};

export default injectIntl(ListingBody);
