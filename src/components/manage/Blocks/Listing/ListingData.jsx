import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';
import { schemaListing } from './schema';

const ListingData = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = schemaListing({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      block={block}
    />
  );
};

ListingData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default ListingData;
