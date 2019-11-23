import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import { SidebarPortal } from '@plone/volto/components';

import ListingSidebar from './ListingSidebar';
import ListingBody from './ListingBody';

const Edit = ({ data, onChangeBlock, block, selected, properties }) => {
  React.useEffect(() => {
    if (!data.query) {
      onChangeBlock(block, {
        ...data,
        query: [],
        block: block,
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      {data?.query?.length === 0 && (
        <FormattedMessage id="Contained items" defaultMessage="Contained items">
          {message => <p className="items-preview">{message}</p>}
        </FormattedMessage>
      )}
      {data?.query?.length > 0 && (
        <FormattedMessage id="Results preview" defaultMessage="Results preview">
          {message => <p className="items-preview">{message}</p>}
        </FormattedMessage>
      )}
      <ListingBody data={data} properties={properties} block={block} />
      <SidebarPortal selected={selected}>
        <ListingSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(Edit);
