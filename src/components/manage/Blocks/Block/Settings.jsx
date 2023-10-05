import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import BlockDataForm from '@plone/volto/components/manage/Form/BlockDataForm';

const Settings = ({ data, block, onChangeBlock, schema }) => {
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
      onChangeBlock={onChangeBlock}
      formData={data}
      applySchemaEnhancers={false}
    />
  );
};

Settings.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  schema: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(Settings);
