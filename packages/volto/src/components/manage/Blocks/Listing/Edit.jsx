import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import isEqual from 'lodash/isEqual';

import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import { default as ListingBody } from '@plone/volto/components/manage/Blocks/Listing/ListingBody';
import ListingData from './ListingData';

import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';

const messages = defineMessages({
  results: {
    id: 'Results preview',
    defaultMessage: 'Results preview',
  },
  items: {
    id: 'Contained items',
    defaultMessage: 'Contained items',
  },
});

const Edit = React.memo(
  (props) => {
    const { data, onChangeBlock, block, selected, pathname } = props;
    const intl = useIntl();
    const placeholder =
      data.placeholder ||
      (data?.querystring?.query?.length
        ? intl.formatMessage(messages.results)
        : intl.formatMessage(messages.items));

    return (
      <>
        <p className="items-preview">{placeholder}</p>
        <ListingBody {...props} path={getBaseUrl(pathname)} isEditMode />
        <SidebarPortal selected={selected}>
          <ListingData
            key={block}
            {...props}
            data={data}
            block={block}
            onChangeBlock={onChangeBlock}
          />
        </SidebarPortal>
      </>
    );
  },
  function areEquals(prevProps, nextProps) {
    return !(
      nextProps.selected !== prevProps.selected ||
      !isEqual(prevProps.data, nextProps.data)
    );
  },
);

Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default withBlockExtensions(Edit);
