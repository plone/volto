import React from 'react';
import PropTypes from 'prop-types';
import { blocks } from '~/config';
import TemplateWidget from '@plone/volto/components/manage/Blocks/Listing/TemplateWidget';

const ListingStyle = ({ data, block, onChangeBlock, required = false }) => {
  const templatesConfig = blocks.blocksConfig.listing.templates;

  if (templatesConfig && Object.keys(templatesConfig).length > 1) {
    return (
      <div className="sidebar-listing-data listing-style">
        <TemplateWidget
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
          required={required}
        />
      </div>
    );
  }

  return null;
};

ListingStyle.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default ListingStyle;
