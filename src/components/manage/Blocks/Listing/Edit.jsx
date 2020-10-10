import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { copyBlock } from '@plone/volto/actions';

import {
  SidebarPortal,
  ListingBlockBody as ListingBody,
  ListingBlockSidebar as ListingSidebar,
} from '@plone/volto/components';
import { getBaseUrl } from '@plone/volto/helpers';

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

const Edit = ({
  data,
  onChangeBlock,
  block,
  selected,
  properties,
  pathname,
  intl,
}) => {
  // componentDidMount
  React.useEffect(() => {
    if (!data.query) {
      onChangeBlock(block, {
        ...data,
        query: [],
        block,
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  const placeholder =
    data.placeholder ||
    (data?.query?.length
      ? intl.formatMessage(messages.results)
      : intl.formatMessage(messages.items));

  const dispatch = useDispatch();

  /**
   * Copy block handler
   * @function onCopy
   * @returns {undefined}
   */
  const onCopy = () => {
    dispatch(copyBlock(data));
  };

  return (
    <>
      <p className="items-preview">{placeholder}</p>
      <ListingBody
        data={data}
        properties={properties}
        block={block}
        path={getBaseUrl(pathname)}
        isEditMode
      />
      <SidebarPortal selected={selected}>
        <ListingSidebar
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          onCopy={onCopy}
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
  pathname: PropTypes.string.isRequired,
};

export default injectIntl(Edit);
