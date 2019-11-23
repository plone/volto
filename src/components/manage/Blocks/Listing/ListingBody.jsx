import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FormattedMessage, injectIntl } from 'react-intl';
import { getQueryStringResults } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

const ListingItem = ({ data, properties, intl }) => {
  const querystringResults = useSelector(
    state => state.querystringsearch.subrequests,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.query?.length > 0) {
      dispatch(getQueryStringResults({ ...data, fullobjects: 1 }, data.block));
    }
  }, [dispatch, data, data.block]);

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
            <div className="listing-item" key={item.UID}>
              <Link to={flattenToAppURL(item['@id'])}>
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
              </Link>
            </div>
          ))}
        </>
      ) : (
        <div className="listing">
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

ListingItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(ListingItem);
