import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import InlineForm from '@plone/volto/components/manage/Form/InlineForm';

const Settings = ({ data, block, onChangeBlock, schema }) => {
  return (
    <InlineForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
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
