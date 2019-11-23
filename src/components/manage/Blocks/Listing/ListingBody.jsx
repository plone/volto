import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getQueryStringResults } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

const ListingItem = ({ data, properties, intl }) => {
  const querystringResults = useSelector(
    state => state.querystringsearch.subrequests,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data?.query?.length > 0) {
      dispatch(getQueryStringResults(data, data.block));
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
        <List>
          {listingItems.map(item => {
            // const image = get(item, 'image.scales.mini.download', '').replace(
            //   settings.apiPath,
            //   '',
            // );
            // const url = item['@id'].replace(settings.apiPath, '');
            return (
              <List.Item key={item.UID}>
                {/* {image && <Image avatar src={image} alt={item.title} />} */}
                <List.Content>
                  <List.Header>
                    <Link to={flattenToAppURL(item['@id'])}>
                      {item.title ? item.title : item.id}
                    </Link>
                  </List.Header>
                  <List.Description>{item.description}</List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
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
