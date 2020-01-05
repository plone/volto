import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import { ConditionalLink } from '@plone/volto/components';
import { getQueryStringResults } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

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

  return (
    <>
      {listingItems.length > 0 ? (
        <>
          {listingItems.map(item => (
            <div className="listing-item" key={item['@id']}>
              <ConditionalLink
                to={flattenToAppURL(item['@id'])}
                condition={!isEditMode}
              >
                {!item[settings.listingPreviewImageField] && (
                  <img src={DefaultImageSVG} alt="" />
                )}
                {item[settings.listingPreviewImageField] && (
                  <img
                    src={flattenToAppURL(
                      item[settings.listingPreviewImageField].scales.preview
                        .download,
                    )}
                    alt={item.title}
                  />
                )}
                <div className="listing-body">
                  <h3>{item.title ? item.title : item.id}</h3>
                  <p>{item.description}</p>
                </div>
              </ConditionalLink>
            </div>
          ))}
        </>
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
