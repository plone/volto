import React from 'react';
import { useIntl } from 'react-intl';
import { BlockDataForm } from '@plone/volto/components';
import { RowSchema } from './schema';
import config from '@plone/volto/registry';

const RowData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();

  const dataAdapter = config.getComponent({
    name: 'dataAdapter',
    dependencies: ['Row', 'BlockData'],
  }).component;

  const schema = RowSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        dataAdapter({
          block,
          data,
          id,
          onChangeBlock,
          value,
        });
      }}
      formData={data}
      block={block}
      onChangeBlock={onChangeBlock}
      blocksConfig={blocksConfig}
    />
  );
};

export default RowData;
